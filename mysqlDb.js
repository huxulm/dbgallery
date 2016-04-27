var mysqlDb = require('mysql');

var mysql = module.exports = function () {

	// 普通连接
	var connection = mysqlDb.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'xlm1',
	  database : 'world'
	});

	// 连接
	connection.connect();

	this.testQuery = function testQuery () {
		connection.query('select ID 城市编码, name 城市名称 from city limit 1, 2', function (err, rows, fields) {
		if (err) 
			throw err;
			console.log('[普通连接]城市:' + JSON.stringify(rows));
		});
		connection.end();
	}


	// 池化管理
	var pool = mysqlDb.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'xlm1',
	  database : 'world',
	  connectionLimit: 10, 
	});

	this.testPooledQuery = function testPooledQuery (argument) {
		pool.query('select code 国家编码, name 国家名称 from country limit ?, ?', [2, 1], function (err, rows, fields) {
			if (err) 
				throw err;

			console.log('[连接池]国家:' + JSON.stringify(rows));
		});

		pool.query('select now() AS ntime from dual', function (err, rows) {
			if (err) 
				throw err;

			console.log('[连接池]北京时间:' + rows[0].ntime);
		});		
	}

	return this;

}