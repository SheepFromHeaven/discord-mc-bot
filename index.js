const Discord = require("discord.js");
const client = new Discord.Client();

const isValidUserMessage = require('./validateMessage');
const onMessage = require('./onMessage');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if(isValidUserMessage(client.user.id, message)) {
    console.log('Received valid user message: ', message.content);
    onMessage(message);
  }
});

client.login(require('./token'));
