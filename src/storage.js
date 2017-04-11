const MongoClient = require('mongodb').MongoClient;
const log = require('./logger').log;

const collectionName = 'record';

const connectionString = process.env.MONGODB_CONNECTION_STRING;

exports.getRecords = (type, callback) => {
  MongoClient.connect(connectionString, function(err, db) {
    log('MondoDB connected');
    const col = db.collection(collectionName);
    col.find({'type': type}).toArray(function(err, items) {
      log('MongoDB request complete');
      db.close().then(()=>{
        log('MondoDB connection closed');
      });
      callback(items);
    });
  });
};
