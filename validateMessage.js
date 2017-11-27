const { allPass, not, pipe, curry, contains, flip, prop, or } = require('ramda');
const config = require('./config.js');

const isByUser = curry((userId, msg) => {
  return msg.author.id === userId
});
const isNotByUser = (userId) => pipe(isByUser(userId), not);


const isInChannelList = flip(contains)(config.allowedChannels);
const channelsNotRestricted = !config.restrictChannels;
const wasSentInAllowedChannel = pipe(
  prop('channel'),
  prop('name'),
  isInChannelList
);
const isInValidChannel = pipe(
  wasSentInAllowedChannel,
  or(channelsNotRestricted)
);

const isValidUserMessage = curry((selfId, msg) => allPass([
  isNotByUser(selfId),
  isInValidChannel
])(msg));

module.exports = isValidUserMessage;
