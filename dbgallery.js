var db = require('node-mysql');

var mysql = require('mysql');

var DB = db.DB;
var BaseRow = db.Row;
var BaseTable = db.Table;

var box = new DB({
	host: 'localhost',
	user: 'root',
	password: 'xlm1',
	database: 'world',
	connectionLimit: 50,  
	useTransaction:{
		connectionLimit: 1
	}
});

var basicTest = function (cb) {
	box.connect(function(conn, cb) {
        cps.seq([
            function(_, cb) {
                conn.query('select * from city limit 1', cb);
            },
            function(res, cb) {
                console.log(res);
                console.log('OK?');
                cb();
            }
        ], cb);
    }, cb);
}

// why cant work?
// what is cb?
// basicTest(function () {
// 	console.log('I am ok.');
// });

// 普通连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xlm1',
  database : 'world'
});

connection.connect();

connection.query('select ID 城市编码, name 城市名称 from city limit 1, 2', function (err, rows, fields) {
	if (err) throw err;

	console.log('城市:' + JSON.stringify(rows));
});
connection.end();

// 池化管理
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'xlm1',
  database : 'world',
  connectionLimit: 10, 
});

pool.query('select code 国家编码, name 国家名称 from country limit ?, ?', [2, 1], function (err, rows, fields) {
	if (err) throw err;

	console.log('国家:' + JSON.stringify(rows));
});

pool.query('select now() AS ntime from dual', function (err, rows) {
	if (err) throw err;

	console.log('北京时间:' + rows[0].ntime);
});


