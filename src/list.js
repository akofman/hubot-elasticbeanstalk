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
//   eb list - List all available applications and their environments
//
// Author:
//   akofman

const tsv = require('tsv');
const eb = require('../eb');

const retrieveEnvironments = (appName) => {
  return new Promise((resolve, reject) => {
    const appData = {
      appName: appName,
      environments: []
    };

    eb.describeEnvironments({ApplicationName: appName}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.Environments.forEach((env) => {
          console.log(env);
          appData.environments.push({
            name: env.EnvironmentName,
            cname: env.CNAME,
            status: env.Status,
            lastUpdate: env.DateUpdated
          });
        });
        resolve(appData);
      }
    });
  });
};

module.exports = (robot) => {
  robot.respond(/eb list/i, (msg) => {
    msg.send('Fetching ...');

    eb.describeApplications({}, (err, data) => {
      if (err) {
        msg.send(`Error: ${err}`);
      } else {
        if (!data.Applications.length) {
          msg.send('[None]');
        } else {
          const promises = [];
          let messages = '';

          data.Applications.forEach((app) => {
            promises.push(retrieveEnvironments(app.ApplicationName));
          });

          Promise.all(promises).then((promise) => {

            promise.forEach((msg) => {
              let message = `\n Application Name: \n\t ${msg.appName} \n Environments:`;

              msg.environments.forEach((env) => {
                message = `${message} \n\t ${env.name} \n\t\t cname: ${env.cname} \n\t\t lastUpdate: ${env.lastUpdate} \n\t\t status: ${env.status}`;
              });

              messages = `${messages} ${message} \n`;
            });
            msg.send(messages);
          }).catch((err) => {
            msg.send(`Error: ${err}`);
          });
        }
      }
    });
  });
}
