var couchbase = require("couchbase");
var config = require('../config.json')
var _ = require("underscore")

/*exports.getvalue = function(argument) {
  db = new couch.Connection({host: config.db, bucket: config.bucket, password: config.password})

}*/
exports.getbucket = function(){
  var cluster = new couchbase.Cluster(config.db)
  var db = cluster.openBucket(config.bucketname, function(err) {
    if (err) {
      // Failed to make a connection to the Couchbase cluster.
      throw err;
    }
  })
  return db;
}

