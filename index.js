const fs = require('fs');
const path = require('path');

module.exports = (robot, scripts) => {
  const scriptsPath = path.resolve(__dirname, 'src');
  if (fs.existsSync(scriptsPath)) {
    return (() => {
      const result = [];
      for (let script of Array.from(fs.readdirSync(scriptsPath).sort())) {
        let item;
        if ((scripts != null) && !Array.from(scripts).includes('*')) {
          if (Array.from(scripts).includes(script)) { item = robot.loadFile(scriptsPath, script); }
        } else {
          item = robot.loadFile(scriptsPath, script);
        }
        result.push(item);
      }
      return result;
    })();
  }
};
