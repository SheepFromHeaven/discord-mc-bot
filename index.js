const { match, allPass, pipe, toLower, flip, gt, length, curry } = require('ramda');
const Discord = require("discord.js");
const client = new Discord.Client();
const { spawn } = require('child_process');

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
      const shScript = spawn('python', ['test.py', '-t', minutes]);

      shScript.stdout.on('data', (data) => {
        send(`${data}`);
      });

      shScript.on('exit', (code) => {
        console.log("Process quit with code : " + code);
      });
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
