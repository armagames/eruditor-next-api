const util = require('util');
const express = require('express');
const source = require('./source');

const log = util.debuglog('eruditor-next-api');
const app = express();

const handle = (req, res) => {
  const type = req.params.type;
  const id = req.params.id;

  source.get(res, type, id);
};

exports.run = () => {
  app.use((req, res, next) => {
    const origin = (req && req.headers && req.headers.origin)
      || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/api/:type', handle);

  app.get('/api/:type/:id', handle);

  app.listen(27099, () => {
    log('listening port 27099');
  });
};
