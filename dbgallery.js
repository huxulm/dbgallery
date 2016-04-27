var mongo = require('./mongoDb');

var mysql = require('./mysqlDb');

// 测试mysql
mysql().testQuery();
mysql().testPooledQuery();

// 测试mongoose
// mongo().testQueryUser();


