const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const PORT = 8080;

var users = [];

server.listen(process.env.PORT || PORT, () => {
	console.log(`app run at: http://127.0.0.1:${PORT}`);
});

io.on('connection', (socket) => {
	console.log('Socket.io初始化成功！');
	socket.on('send', (data) => {
		console.log('客户端发送的内容：', data);
		socket.emit('getMsg', '我是返回的消息...');
	});

	let username = null;

	socket.on('login', (data) => {
        // 这里先在users数组里面检查是否有重复的用户名，如果是新用户，则登录聊天室成功
        console.log(data);
		if (users.some((user) => user.username === data.username)) {
			socket.emit('loginFail', '昵称重复');
		} else {
			username = data.username;
			users.push({ username: data.username });
			socket.emit('loginSuccess', data);
			// 向所有连接的客户端广播add事件
			io.sockets.emit('add', data.username);
		}
	});

	socket.on('sendMessage', (data) => {
		io.sockets.emit('receiveMessage', data);
	});

	socket.on('disconnect', () => {
		io.sockets.emit('leave', username);
		users.map((user, index) => {
			if (user.username === username) {
				users.splice(index, 1);
			}
		});
	});
});
