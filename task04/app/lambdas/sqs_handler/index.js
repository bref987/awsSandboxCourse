exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        const messageBody = record.body;
        console.log('SQS Message:', messageBody);
    }

    return `Successfully processed ${event.Records.length} messages.`;
};