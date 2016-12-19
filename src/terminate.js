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
//   eb terminate - Terminates the given environment
//
// Author:
//   akofman

const eb = require('../eb');

module.exports = (robot) => {
  robot.respond(/eb terminate (.*)/i, (msg) => {
    eb.terminateEnvironment({EnvironmentName: msg.match[1]}, (err, data) => {
      if (err) {
        msg.send(`Error: ${err}`);
      } else {
        msg.send(`${msg.match[1]} environment is now terminating, it will take a few minutes.`);
      }
    });
  });
}
