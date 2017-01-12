const stogare = require('./storage');

let records = {};

const getRecordsByType = (type, callback) => {
  if (!records[type]) {
    stogare.getRecords(type, (items) => {
      records[type] = items;
      callback(records[type]);
    });
  } else {
    callback(records[type]);
  }
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max - min);
  rand = Math.round(rand);
  return rand;
};

const getRandomRecord = (type, callback) => {
  getRecordsByType(type, (items) => {
    const count = items.length;
    const index = randomInteger(0, count);
    const selectedRecord = items[index];
    callback(selectedRecord);
  });
};

exports.get = (res, type) => {
  getRandomRecord(type, (record) => {
    res.json(record);
  });
};
