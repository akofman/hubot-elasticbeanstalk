const AWS = require('aws-sdk');

AWS.config= {
  region: process.env.HUBOT_AWS_REGION
};

module.exports = new AWS.ElasticBeanstalk();
