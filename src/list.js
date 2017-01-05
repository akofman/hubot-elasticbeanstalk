// Description:
//   Elasticbeanstalk tools
//
// Dependencies:
//   None
//
// Configuration:
//   AWS_REGION
//
// Commands:
//   eb list [<region>]- List all available applications and environments.
//
// Author:
//   akofman

const eblist = require('node-elasticbeanstalk-list');

module.exports = (robot) => {
  robot.respond(/eblist(\s)?(.*)?/i, (msg) => {
    msg.send('Fetching ...');
    setTimeout(() => {
      eblist({region: msg.match[2] || process.env.AWS_REGION}).then((result) => {
        msg.send(result);
      }).catch((err) => {
        msg.send(`Error: ${err}`);
      });
    }, 1000);
  });
};
