const util = require('util');

const debuglog = util.debuglog('eruditor-next-api');

exports.log = (message) => {
  debuglog(message);
};
