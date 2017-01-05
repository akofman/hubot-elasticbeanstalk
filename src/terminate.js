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
//   eb terminate <environment> [in region ][<region>]- Terminates the given environment
//
// Author:
//   akofman

const ebterminate = require('node-elasticbeanstalk-terminate');

module.exports = (robot) => {
  robot.respond(/ebterminate (.*?(?=\s|$))(\sin\sregion\s|\s)?([^\s]+)?/i, (msg) => {
    msg.send('Preparing for termination ...');
    setTimeout(() => {
      ebterminate(msg.match[1],{region: msg.match[3] || process.env.AWS_REGION}).then((result) => {
        msg.send('Environment is well terminating');
        msg.send(JSON.stringify(result));
      }).catch((err) => {
        msg.send(`Error: ${err}`);
      });
    },1000);
  });
}
