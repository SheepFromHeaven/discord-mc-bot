const { match, allPass, pipe, toLower, flip, gt, length, curry } = require('ramda');

const meeseeks = require('./meeseeks');
const startMinecraftServer = require('./startMinecraftServer');

const onMessage = (message) => {
  const send = createSender(message);
  if(shouldStartServer(message.content)) {
    waitingForTime = true;
    send(meeseeks('How many minutes do you want to play?'));
  } else if(waitingForTime) {
    const minutes = parseNumber(message.content);
    if(!minutes) {
      send(meeseeks('I couldn\'t understand you. How many minutes did you say?'));
    } else {
      startMinecraftServer(send, minutes);
      waitingForTime = false;
    }
  }
};

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


module.exports = onMessage;
