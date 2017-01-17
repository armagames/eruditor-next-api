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

const findItemById = (id) => {
  return (item) => {
    return item._id.toString() === id;
  };
};

const getRecordById = (type, id, callback) => {
  getRecordsByType(type, (items) => {
    const selectedRecord = !id ? undefined : items.find(findItemById(id));
    callback(selectedRecord);
  });
};

const response = (res, record) => {
  if (record) {
    res.json(record);
  } else {
    res.status(404).json({
      type: 'error',
      text: 'Запись не найдена',
      author: 'Eruditor.Next',
    });
  }
};

exports.get = (res, type, id) => {
  if (id) {
    getRecordById(type, id, (record) => {
      response(res, record);
    });
  } else {
    getRandomRecord(type, (record) => {
      response(res, record);
    });
  }
};
