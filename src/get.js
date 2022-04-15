import handler from './util/handler';
import dynamoDb from './util/dynamodb'

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // `Key` defines the partition and sort keys of the item to retrieve
    Key: {
      userId: '123',
      noteId: event.pathParameters.id,
    }
  }

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found');
  }

  return result.Item
})