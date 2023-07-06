'use strict'

require('dotenv').config()
const port = process.env.PORT
const socket= require('socket.io')
const ioServer= socket(port)

ioServer.on('connection', (newSocket)=>{
  console.log(`welcome to server socket , id: ${newSocket.id}`)
  
  newSocket.on('new-flight', (flightDetails) => {
      console.log('Flight', flightDetails);
      ioServer.emit('new-flight', flightDetails)
    });
    
    // newSocket.on('took-off', (flightDetails) => {
    //   console.log('Flight', flightDetails);
    // });
    
    newSocket.on('arrived', (flightDetails) => {
      console.log('Flight', flightDetails);
      ioServer.emit('arrived', flightDetails)

    });
})



const nameSpaceChannel= ioServer.of('/airline')

nameSpaceChannel.on('connection', (newSocket)=>{
    console.log(`new connection between system and pilot, id: ${newSocket.id} `)
    nameSpaceChannel.emit('test')

        newSocket.on('took-off', (flightDetails) => {
          console.log('Flight', flightDetails);
        });
        
       
})
