var redis = require('redis');
var client = redis.createClient({ port: 6380 });

function doTask(client, i) {
	return new Promise(function (resolve, reject) {
		var multi = client.multi();
		multi.incr('test');
		multi.get('test');
		multi.exec(function(err, data) {
			if (parseInt(data[0]) != parseInt(data[1])) {
				console.error('error!!!', data);
				reject({ m: 'error!!!', data: data });
			} else { 
				console.log(data[0]);
				resolve({ data: data });
			}
		});
	});
};

var tasks = [];
for (var i = 0; i < 100000; i ++) { 
	tasks.push(doTask(client, i));
};

Promise.all(tasks)
	.then(function(rs) {
		console.log('done:', rs.length);
	});


