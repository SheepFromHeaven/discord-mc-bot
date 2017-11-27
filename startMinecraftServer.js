const { spawn } = require('child_process');
const config = require('./config');
const meeseeks = require('./meeseeks');

const startMinecraftServer = (send, minutes) => {
  const shScript = spawn(config.python, ['test.py', '-d', minutes]);

  shScript.stdout.on('data', (data) => {
    send(meeseeks(data));
  });

  shScript.stderr.on('data', (data) => {
    console.error("Process quit with error : " + data);
  });

  shScript.on('error', (error) => {
    console.error("Process quit with error : " + error.message);
  });

  shScript.on('exit', (code, signal) => {
    console.log("Process quit with code : " + code + ' ' + signal);
  });
};

module.exports = startMinecraftServer;
