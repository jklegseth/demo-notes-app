import handler from './util/handler'
import dynamoDb from './util/dynamodb'

export const main = handler(async (event) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.TABLE_NAME,
    // partition key and sort key
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null
    },
    // `ReturnValues` specifies if/how to return an item's attrs
    // `ALL_NEW` returns all attributes of item after update
    ReturnValues: 'ALL_NEW'
  };

  await dynamoDb.update(params)
  return { status: true}
})