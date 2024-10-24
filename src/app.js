import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
export const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, "template", 'index.html'));
});

// Socket.io events
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

// http server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
})