const { match, allPass, pipe, toLower, flip, gt, length, curry } = require('ramda');
const Discord = require("discord.js");
const client = new Discord.Client();
const { spawn } = require('child_process');
const config = require('./config.js');

const isValidUserMessage = require('./validateMessage.js');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const send = createSender(message);

  if(isValidUserMessage(client.user.id, message)) {
    console.log('Received valid user message: ', message.content);
    if(shouldStartServer(message.content)) {
      waitingForTime = true;
      send('Wie viele Minuten möchtest du spielen?');
    } else if(waitingForTime) {
      const minutes = parseNumber(message.content);
      const shScript = spawn(config.python, ['test.py', '-d', minutes]);

      shScript.stdout.on('data', (data) => {
        send(`${data}`);
      });

      shScript.stderr.on('data', (data) => {
        console.log("Process quit with error : " + data);
      });

      shScript.on('error', (error) => {
        console.log("Process quit with error : " + error.message);
      });

      shScript.on('exit', (code, signal) => {
        console.log("Process quit with code : " + code + ' ' + signal);
      });

      waitingForTime = false;
    }
  }
});

client.login(require('./token'));

const createSender = curry((message, content) => {
  message.channel.send(content);
});






const matchNoCase = (text) => pipe(
  toLower,
  match(new RegExp(text)),
  length,
  flip(gt)(0)
);

const containsServer = matchNoCase('server');
const containsStart = matchNoCase('start');

const shouldStartServer = allPass([
  containsServer,
  containsStart
]);

let waitingForTime = false;
const parseNumber = (msg) => parseInt(msg);
