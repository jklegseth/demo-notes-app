import AWS from 'aws-sdk'

const client = new AWS. DynamoDB.DocumentClient()

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.get(params).promise(),
  query: (params) => client.get(params).promise(),
  update: (params) => client.get(params).promise(),
  delete: (params) => client.get(params).promise(),
}