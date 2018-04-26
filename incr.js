const redis = require('redis');
const fs = require('fs');
var client = redis.createClient({ 
	port: 6380,
	no_ready_check : true,  //檢查是否真的 Ready
	enable_offline_queue: false,  //關掉 Buffer
 });

function doTask(client, i) {
	return new Promise(function (resolve, reject) {
		client.incr('cnt', function(err, data) {
			client.sadd('mem', data, function (err1, num1) {
				if (parseInt(num1, 10) == 0) { 
					var m = `error: incr=${data}, sadd result = ${num1}`;
					console.error(m);
					fs.appendFile('error.txt', m + '\r\n', function () {
						process.exit();
					});
				} else {
					console.log(`times: ${i}, num1: ${num1}`);
				}
				resolve('ok');
			});
		});
	});
};



client.on('ready', function() {

	var tasks = [];
	for (var i = 0; i < 1000000; i ++) { 
		tasks.push(doTask(client, i));
	};

	Promise.all(tasks)
		.then(function(rs) {
			console.log('done:', rs.length);
		});
});




