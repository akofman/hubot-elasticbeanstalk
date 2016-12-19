// Description:
//   Elasticbeanstalk tools
//
// Dependencies:
//   None
//
// Configuration:
//   HUBOT_AWS_REGION
//
// Commands:
//   eb describeApplications - List elasticbeanstalk applications
//
// Author:
//   akofman

const tsv = require('tsv');
const eb = require('../eb');

module.exports = (robot) => {
  robot.respond(/eb describeApplications/i, (msg) => {
    msg.send('Fetching ...');

    const applications = eb.describeApplications({}, (err, data) => {
      if(err) {
        msg.send(`Error: ${err}`);
      } else {
        msg.send(tsv.stringify(data.Applications) || '[None]');
      }
    });
  });
}
