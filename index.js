const e = require('cors');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port =  process.env.port || 5000;
var clients= {};

//middeware
 app.use(express.json());


io.on('connection', (socket)=> {
    console.log('connected to socket');
    console.log(socket.id,'has joined the connection');
    console.log(socket.id);
    socket.on('login', (id)=> {
        clients[id] = socket;
        console.log(clients[id]);
       console.log('user with id ' + id + ' joined the connection');
    });
 


   
    socket.on('message', (message)=> {
        console.log(message);
        let targetID = message.targetID;
        if(clients[targetID]){
            clients[targetID].emit('message', message);
        }

    });
});

app.get('/check', (req, res)=> {
  return  res.json({"message": "Flash Chat App  is Live "});
});


server.listen(port, "0.0.0.0",   console.log(`listening on port ${port}`));


