'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const item = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      json: item,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp
    },
  };

  // write the todo to the database
  return dynamoDb.put(params).promise().then(() => {

      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
      callback(null, response);

      return;    
    });
};
