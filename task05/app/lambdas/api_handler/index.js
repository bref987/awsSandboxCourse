const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialize the DynamoDB DocumentClient
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(event);
    return event;
    // try {
    //     // Parse the request body
    //     const requestBody = JSON.parse(event.body);
    //     const { principalId, content } = requestBody;

    //     console.log(requestBody, '+++++++++++++');
        
    //     // Generate UUID v4 for id
    //     const id = uuidv4();
        
    //     // Get the current time in ISO 8601 format
    //     const createdAt = new Date().toISOString();
        
    //     // Prepare the item to be saved to DynamoDB
    //     const item = {
    //         id: id,
    //         principalId: principalId,
    //         createdAt: createdAt,
    //         body: content
    //     };
        
    //     // Save the item to DynamoDB
    //     await dynamodb.put({
    //         TableName: 'Events',
    //         Item: item
    //     }).promise();
        
    //     // Return the created event as a response
    //     return {
    //         statusCode: 201,
    //         body: JSON.stringify({
    //             statusCode: 201,
    //             event: item
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    // } catch (error) {
    //     console.error('Error saving event to DynamoDB:', error);
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ error: 'Could not save event' }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    // }
};
