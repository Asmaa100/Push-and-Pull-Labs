import http from 'http';
const server =http.createServer();
import { Server } from 'socket.io';


const io =new Server(server,{
    cors:{
        origin:"*"
    }
});

io.on('connection',(socket)=>{
    socket.on('message',(message)=>{
        socket.broadcast.emit('new-message',message)
    })
    console.log("New Client Connected")
})
server.listen(8080,()=>{
    console.log("Listening on :3000")
})

export default server;
