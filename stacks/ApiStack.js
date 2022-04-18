import * as sst from "@serverless-stack/resources"

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props)

    // Expects this resource to be passed in (created in StorageStack)
    const { table } =  props;

    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        // sets env var needed to query the table
        environment: {
          TABLE_NAME: table.tableName
        }
      },
      routes: {
        "GET  /notes": "src/list.main",
        "POST /notes": "src/create.main",
        "GET  /notes/{id}": 'src/get.main',
        "PUT  /notes/{id}": 'src/update.main',
        "DELETE /notes/{id}": 'src/delete.main'
      }
    })

    // Gives API permission to access the DynamoDB table
    this.api.attachPermissions([table])
    // Exposes API publicly so we can refer to it in other stacks.
    this.addOutputs({
      ApiEndpoint: this.api.url
    })
  }
}