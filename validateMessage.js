const { allPass, not, pipe, curry } = require('ramda');
const config = require('./config.js');

const isByUser = curry((userId, msg) => {
  return msg.author.id === userId
});
const isNotByUser = (userId) => pipe(isByUser(userId), not);

const isInValidChannel = (msg) => msg.channel.name === config.channel;

const isValidUserMessage = curry((selfId, msg) => allPass([
  isNotByUser(selfId),
  isInValidChannel
])(msg));

module.exports = isValidUserMessage;
