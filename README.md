# hubot-elasticbeanstalk

A hubot script to manage AWS Elastic Beanstalk applications

See files in the [`src/`](src/) folder for full documentation.

## Installation

Of course in order to use these tools you need an AWS account and to configure your [credentials](http://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html).
Also the AWS region has to be configured from the `AWS_REGION` environment variable or given as a parameter.

In hubot project repo, run:

`npm install hubot-elasticbeanstalk --save`

Then add **hubot-elasticbeanstalk** to your `external-scripts.json`:

```json
[
  "hubot-elasticbeanstalk"
]
```

## Sample Interaction

```
user1>> hubot eblist
hubot>> Fetching ...
Application Name:
     my-wonderful-app
Environments:
     dev
         currentVersion: app-161202_041400
         cname: dev.eu-west-1.elasticbeanstalk.com
         lastUpdate: Fri Dec 02 2016 04:26:24 GMT+0100 (CET)
         status: Ready
```

## NPM Module

https://www.npmjs.com/package/hubot-elasticbeanstalk
