import http from 'http';
import RequestController from './controllers/requestController.js';
import IOController from './controllers/ioController.js';
import { Server as ServerIO } from 'socket.io';
//import Game from '../client/src/scripts/Game.js'


const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);
const ioController = new IOController(io);
io.on('connection', socket => {
	ioController.registerSocket(socket);

})

server.listen(9000);
