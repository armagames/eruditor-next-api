const source = require('./source');

exports.fact = (res) => {
  source.get(res, 'fact');
};

exports.saying = (res) => {
  source.get(res, 'saying');
};

exports.joke = (res) => {
  source.get(res, 'joke');
};
