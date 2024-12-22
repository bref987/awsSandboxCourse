const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.target_table;

exports.handler = async (event) => {
    for (const record of event.Records) {
        const { eventName, dynamodb: dbRecord } = record;
        const newImage = AWS.DynamoDB.Converter.unmarshall(dbRecord.NewImage || {});
        const oldImage = AWS.DynamoDB.Converter.unmarshall(dbRecord.OldImage || {});

        let auditEntry = {
            id: uuid.v4(),
            itemKey: newImage.key || oldImage.key,
            modificationTime: new Date().toISOString(),
            updatedAttribute: 'value',
            oldValue: oldImage.value,
            newValue: newImage.value
        };

        switch (eventName) {
            case 'INSERT':
                auditEntry.oldValue = null;
                break;
            case 'MODIFY':
                break;
            case 'REMOVE':
                auditEntry.newValue = null;
                break;
        }

        await storeAuditEntry(auditEntry);
    }
    return `Successfully processed ${event.Records.length} records.`;
};

const storeAuditEntry = async (auditEntry) => {
    const params = {
        TableName: tableName,
        Item: auditEntry
    };

    try {
        await dynamodb.put(params).promise();
        console.log('Audit entry stored successfully:', auditEntry);
    } catch (error) {
        console.error('Error storing audit entry:', error);
        throw new Error('Error storing audit entry');
    }
};