'use strict'

require('dotenv').config()
const port = process.env.PORT
const socket= require('socket.io')
const uuid= require('uuid').v4
const ioServer= socket(port)

const queue ={
  flights:{

  }
}


ioServer.on('connection', (newSocket)=>{
  console.log(`welcome to server socket , id: ${newSocket.id}`)
  
  newSocket.on('new-flight', (flightDetails) => {
    console.log( `i got your message`)
      // console.log('Flight', flightDetails);
      ioServer.emit('new-flight', flightDetails)

    const id = uuid()
    queue.flights[id]= flightDetails

    newSocket.emit('added', flightDetails)

    ioServer.emit('flight',{
      id: id,
      payload: queue.flights[id]
    })

  });
     newSocket.on('get_all',()=>{
       Object.keys(queue.flights).forEach((id)=>{
         newSocket.emit('flight',{
           id:id,
           payload: queue.flights[id]
          })
        })
      })
      
      newSocket.on('recieved',(flight)=>{
      console.log('queue v1 ', queue);
     delete queue.flights[flight.id]

     console.log('queue deleted ', queue);
    })
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
