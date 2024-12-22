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
            oldValue: null,
            newValue: null
        };

        switch (eventName) {
            case 'INSERT':
                auditEntry.newValue = newImage.value;
                break;
            case 'MODIFY':
                auditEntry.oldValue = oldImage.value;
                auditEntry.newValue = newImage.value;
                break;
            case 'REMOVE':
                auditEntry.oldValue = oldImage.value;
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