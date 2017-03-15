/**
 * Created by xulingming on 2017/3/15.
 */
var redis = require('redis');
require('bluebird').promisifyAll(redis.RedisClient.prototype);
require('bluebird').promisifyAll(redis.Multi.prototype);

var Promise = require('bluebird');

// console.log('Config: ' + JSON.stringify(require('./conf') || {}));
var client = redis.createClient(require('./conf').conf.redis);

/*client.getAsync('users:id:-1000434828454951192').then(function (res) {
    console.log('Result: \n' + JSON.stringify(res || {}));
}).catch(function (err) {
    console.log('error: \n' + JSON.stringify(err || {}));
});*/


// okay!
Promise.all([client.getAsync('users:id:-1000434828454951192'),
    client.getAsync('users:id:-1000434828454951192'), client.hgetallAsync('user:-1000434828454951192')]).then(function (rs) {
    console.log('Results: \n' + JSON.stringify(rs || {}))
}).catch(function (err) {
    console.log('error: \n' + JSON.stringify(err || {}));
});