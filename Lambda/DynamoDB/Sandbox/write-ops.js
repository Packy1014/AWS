const AWS = require('aws-sdk');
const CREDENTIALS = new AWS.SharedIniFileCredentials({ profile: 'CatShitOne' });
AWS.config.credentials = CREDENTIALS;
AWS.config.update({ region: 'ap-northeast-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put({
//     TableName: 'td_notes',
//     Item: {
//         cat: 'cat3',
//         content: 'content3',
//         note_id: '3',
//         timestamp: 1585978337,
//         title: 'title3',
//         user_id: '3',
//         user_name: 'name3'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// docClient.update({
//     TableName: 'td_notes',
//     Key: {
//         user_id: '3',
//         timestamp: 1585978337
//     },
//     UpdateExpression: 'set #title = :title',
//     ExpressionAttributeNames: {
//         '#title': 'title'
//     },
//     ExpressionAttributeValues: {
//         ':title': 'title_changed'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

docClient.batchWrite({
    RequestItems: {
        'td_notes': [
            {
                DeleteRequest:{
                    Key: {
                        user_id: '3',
                        timestamp: 1585978337
                    }
                }
            },
            {
                PutRequest:{
                    Item: {
                        cat: 'cat4',
                        content: 'content4',
                        note_id: '4',
                        timestamp: 1585978338,
                        title: 'title4',
                        user_id: '4',
                        user_name: 'name4'
                    }
                }
            },
            {
                PutRequest:{
                    Item: {
                        cat: 'cat5',
                        content: 'content5',
                        note_id: '5',
                        timestamp: 1585978339,
                        title: 'title5',
                        user_id: '5',
                        user_name: 'name5'
                    }
                }
            }
        ]
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});