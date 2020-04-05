const AWS = require('aws-sdk');
const CREDENTIALS = new AWS.SharedIniFileCredentials({ profile: 'CatShitOne' });
AWS.config.credentials = CREDENTIALS;
AWS.config.update({ region: 'ap-northeast-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put({
//     TableName: 'td_notes',
//     Item: {
//         cat: 'cat6',
//         content: 'content6',
//         note_id: '6',
//         timestamp: 1585978340,
//         title: 'title6',
//         user_id: '6',
//         user_name: 'name6'
//     },
//     ConditionExpression: '#timestamp <> :timestamp',
//     ExpressionAttributeNames: {
//         '#timestamp': 'timestamp'
//     },
//     ExpressionAttributeValues: {
//         ':timestamp': 1585978340
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// docClient.query({
//     TableName: 'td_notes',
//     KeyConditionExpression: 'user_id = :user_id',
//     ExpressionAttributeValues: {
//         ':user_id': '6'
//     }
//     // KeyConditionExpression: '#user_id = :user_id',
//     // ExpressionAttributeNames: {
//     //     '#user_id': 'user_id'
//     // },
//     // ExpressionAttributeValues: {
//     //     ':user_id': '6'
//     // }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// docClient.scan({
//     TableName: 'td_notes',
//     FilterExpression: 'content = :content',
//     ExpressionAttributeValues: {
//         ':content': 'content2'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

docClient.batchGet({
    RequestItems: {
        'td_notes': {
            Keys: [
                {
                    user_id: '1',
                    timestamp: 1585659990
                },
                {
                    user_id: '4',
                    timestamp: 1585978338
                }
            ]
        }
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});