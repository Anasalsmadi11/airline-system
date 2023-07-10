'use strict'

require('dotenv').config()
const port= process.env.PORT || 3030
const io= require('socket.io-client')
const host= `http://localhost:${port}/` 
const systemConnection= io.connect(host)
const hostNameSpace= `http://localhost:${port}/airline` 
const pilotConnection= io.connect(hostNameSpace)

pilotConnection.on('test', ()=>{
  console.log('this is a message from system to pilot only')
})


systemConnection.emit('get_all')
systemConnection.on('flight', (flight)=>{
console.log('Pilot:Sorry i didnt catch this flight ID',flight.id)
systemConnection.emit('recieved', flight)
})

systemConnection.on('new-flight', (flightDetails) => { 
    setTimeout(() => {
      console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'took-off');
      flightDetails.event = 'took_off';
      flightDetails.time = new Date();
      pilotConnection.emit('took-off', flightDetails);
      
  //     systemConnection.emit('get_all')
  //   systemConnection.on('flight', (flight)=>{
  //   console.log('Pilot:Sorry i didnt catch this flight ID',flight.id)
  //   systemConnection.emit('recieved', flight)
  // })
    }, 4000);
    setTimeout(() => {
      console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'has arrived');
      flightDetails.event = 'arrived';
      flightDetails.time = new Date();
      systemConnection.emit('arrived', flightDetails);
    }, 7000);
  });
  


