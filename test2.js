
const io = require('socket.io-client');


const socket = io('https://spin-web-socket.jerryzheng5.repl.co');







console.log('running');

  
socket.emit('sell', 60);