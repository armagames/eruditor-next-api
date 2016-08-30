const request = require('request');

const util = require('util');

const urlTemplate = 'http://randstuff.ru/%s/generate/';
const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
};
const defaultConverter = (responseText) => JSON.parse(responseText);

exports.get = (res, type) => {
  const options = {
    url: util.format(urlTemplate, type),
    headers: defaultHeaders,
  };

  request.get(options, (err, httpResponse, body) => {
    if (err) {
      res.json({
        type: 'error',
        error: err,
      });
    }

    const item = defaultConverter(body)[type];
    item.type = type;

    res.json(item);
  });
};
