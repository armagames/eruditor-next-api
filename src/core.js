const util = require('util');

const express = require('express');

const get = require('./get');

const log = util.debuglog('eruditor-next-api');
const app = express();

exports.run = () => {
  process.argv.forEach((val, index) => {
    log('%d: %s', index, val);
  });

  const types = [];

  for (const key in get) {
    if ({}.hasOwnProperty.call(get, key) && typeof get[key] === 'function') {
      log('key: %s', key);
      types.push(key);
    }
  }

  app.use((req, res, next) => {
    const origin = (req && req.headers && req.headers.origin)
      || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/api', (req, res) => {
    res.json({
      queryFormal: '/api/:type',
      types,
    });
  });

  app.get('/api/:type', (req, res) => {
    const request = get[req.params.type];
    if (typeof (request) === 'function') {
      request(res);
    } else {
      res.json(
        {
          error: {
            text: 'обработчик для данного запроса не установлен',
          },
        }
      );
    }
  });

  app.listen(27099, () => {
    log('listening port 27099');
  });
};
