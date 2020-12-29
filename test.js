
const io = require('socket.io-client');


const socket = io('https://spin-web-socket.jerryzheng5.repl.co');







console.log('running');


socket.on('user sold stuff', (x) => {
	console.log('someone sold this thing');
	console.log(x);

});
  