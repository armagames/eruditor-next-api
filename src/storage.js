const MongoClient = require('mongodb').MongoClient;

const collectionName = 'record';

const connectionString = process.env.MONGODB_CONNECTION_STRING;

exports.getRecords = (type, callback) => {
  MongoClient.connect(connectionString, function(err, db) {
    const col = db.collection(collectionName);
    col.find({'type': type}).toArray(function(err, items) {
      db.close();
      callback(items);
    });
  });
};
