const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.target_table;

exports.handler = async (event) => {
    console.log('event body', event.body);
    try {
        const requestBody = JSON.parse(event.body);
        const {principalId, content} = requestBody;

        if (!principalId || !content) {
            return {
                statusCode: 400,
                body: JSON.stringify({statusCode: 400, message: 'Invalid request body' }),
            };
        }

        const item = {
            id: uuidv4(),
            principalId: requestBody.principalId,
            createdAt: new Date().toISOString(),
            body: requestBody.content,
        };

        await dynamoDb.put({
            TableName: tableName,
            Item: item,
        }).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({statusCode: 201, event: item }),
        };
    } catch (error) {
        console.error('Error saving event:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({statusCode: 500, message: 'Internal Server Error' }),
        };
    }
};
 