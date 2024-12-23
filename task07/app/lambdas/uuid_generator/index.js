const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();
const bucketName = process.env.target_bucket;

exports.handler = async (event) => {
    console.log('Lambda function triggered');
    console.log('Bucket name:', bucketName);

    const executionTime = new Date().toISOString();
    const uuids = [];

    for (let i = 0; i < 10; i++) {
        uuids.push(uuid.v4());
    }

    const fileName = executionTime;
    const fileContent = JSON.stringify({ ids: uuids });

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ContentType: 'application/json'
    };

    try {
        await s3.putObject(params).promise();
        console.log(`Successfully stored UUIDs in ${fileName}`);
    } catch (error) {
        console.error('Error storing UUIDs:', error);
        throw new Error('Error storing UUIDs');
    }
};
