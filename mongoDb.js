var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	name: String,
	age: Number
});

var UserModel = mongoose.model('User', UserSchema);

	var CarSchema = new Schema({
	name: String,
	car_no: Number
});

var CarModel = mongoose.model('Car', CarSchema);

var db = module.exports=function () {

	this.testQueryUser = function testQueryUser(){
		UserModel.find({}, function (err, docs) {
			if (err)
				throw err;
			console.log(JSON.stringify(docs));
		});
	}

	this.testQueryCar = function testQueryCar () {
		CarModel.find({ car_no: { $lt: 10 }}, function (err, docs) {
			if (err)
				throw err;
			console.log(JSON.stringify(docs));
		});
	}

	this.testUpdateCar = function testUpdateCar () {
		CarModel.findOneAndUpdate({car_no: {$eq: 2599}}, {$set: {name: 'F4'}}, {}, function (err, res) {
			if (err)
				throw err;
			console.log(JSON.stringify(res));
		});
	}
	return this;
}

/*var user = new UserModel({name: '许令明', age: 20});
user.save(function (err, user) {
	if (err)
		throw err;
	console.log(user);
});*/

// 写入测试数据
/*for (var i = 80000 - 1; i >= 0; i--) {
	var car = new CarModel({name : "保时捷A254", car_no: i});
	car.save(function (err, car) {
		console.log('保存车: ' + JSON.stringify(car));
	});
};*/

