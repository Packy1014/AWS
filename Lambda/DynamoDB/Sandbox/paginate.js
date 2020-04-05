const async = require('async');
const _ = require('underscore');
const AWS = require('aws-sdk');
const CREDENTIALS = new AWS.SharedIniFileCredentials({ profile: 'CatShitOne' });
AWS.config.credentials = CREDENTIALS;
AWS.config.update({ region: 'ap-northeast-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

let startKey = [];
let results = [];
let pages = 0;

async.doWhilst(
    (next) => {
        let params = {
            TableName: 'td_notes',
            Limit: 2
        };

        if (!_.isEmpty(startKey)) {
            params.ExclusiveStartKey = startKey;
        };

        docClient.scan(params, (err, data) => {
            if (err) {
                console.log(err);
                next(err, []);
            } else {
                if (typeof data.LastEvaluatedKey != 'undefined') {
                    startKey = data.LastEvaluatedKey;
                } else {
                    startKey = [];
                }

                if (!_.isEmpty(data.Items)) {
                    results = _.union(results, data.Items);
                }

                pages++;

                next(null, results);
            }
        })
    },
    (args, check) => {
        if (_.isEmpty(startKey)) {
            check(null, false);
        } else {
            check(null, true);
        }
    },
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(data, null, 2));
            console.log('Item Count: ', data.length);
            console.log('Pages', pages);
        }
    }
);