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
//   ebdeploy <src> [to ]<environmentName> [in region ][<region>] - Deploy the specified src to the given environment.
//
// Author:
//   akofman

const ebdeploy = require('node-elasticbeanstalk-deploy');

module.exports = (robot) => {
  robot.respond(/ebdeploy (.*?(?=\s))(\sto\s|\s)(.*?(?=\s))(\sin\sregion\s|\s)([^\s]+)/i, (msg) => {
    msg.send('Preparing for deployment...');
    setTimeout(() => {
      ebdeploy(msg.match[3], {src: msg.match[1], region: msg.match[5] || process.env.AWS_REGION}).then((result) => {
        msg.send('Environment is well deploying');
        msg.send(JSON.stringify(result));
      }).catch((err) => {
        msg.send(`Error: ${err}`);
      });
    }, 1000);
  });
};
