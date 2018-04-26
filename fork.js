var fork = require('child_process').fork; // 載入 child_process 模組

for(var i = 0; i < 10; i++){
  // 透過 fork() 方法建立新的 child process
  // console.log('Fork a new child_process now...');
  // fork('./test.js'); // 產生新的 child process
  fork('./incr.js'); // 產生新的 child process
}
