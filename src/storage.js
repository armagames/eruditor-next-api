const MongoClient = require('mongodb').MongoClient;

const collectionName = 'record';

const connectionStringParameterName = '-cs';
let connectionStringParameterIndex = process.argv.indexOf(connectionStringParameterName) + 1;

const connectionString = process.argv[connectionStringParameterIndex];

exports.getRecords = (type, callback) => {
  MongoClient.connect(connectionString, function(err, db) {
    const col = db.collection(collectionName);
    col.find({'type': type}).toArray(function(err, items) {
      db.close();
      callback(items);
    });
  });
};
