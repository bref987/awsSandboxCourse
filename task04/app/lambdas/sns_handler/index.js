exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        const snsMessage = record.Sns.Message;
        console.log('SNS Message:', snsMessage);
    }

    return `Successfully processed ${event.Records.length} messages.`;
};
