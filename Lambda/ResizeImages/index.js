const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuid = require('node-uuid');
const { promisify } = require('util');
const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-1' });
const s3 = new AWS.S3();

exports.handler = async (event) => {
    let filesProcessed = event.Records.map(async (record) => {
        let bucket = record.s3.bucket.name;
        let filename = record.s3.object.key;

        // Get file from S3
        let getOriginalFileParams = {
            Bucket: bucket,
            Key: filename
        };
        let inputData = await s3.getObject(getOriginalFileParams).promise();

        //Resize the file
        let tempFile = os.tmpdir() + '/' + uuid.v4() + '.jpg';
        let resizeArgs = {
            srcData: inputData.Body,
            dstPath: tempFile,
            width: 150
        };
        await resizeAsync(resizeArgs);

        // Read the resized file
        let resizedData = await readFileAsync(tempFile);

        // Upload the new file to S3
        let targetFileName = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
        let putGeneratedFileParams = {
            Bucket: bucket + '-dest',
            Key: targetFileName,
            Body: new Buffer(resizedData),
            ContentType: 'image/jpeg'
        };
        await s3.putObject(putGeneratedFileParams).promise();

        return await unlinkAsync(tempFile);
    });

    await Promise.all(filesProcessed);
    console.log('done');
    return 'done';
}