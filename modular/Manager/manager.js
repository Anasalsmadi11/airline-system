'usr strict'

require('dotenv').config()
const port= process.env.PORT || 3030
const io= require('socket.io-client')
const host= `http://localhost:${port}/` 
const systemConnection= io.connect(host)


const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');



setInterval(() => {
    const flightId = uuidv4();
    // const airline = faker.company.companyName();
    const destination = faker.location.city();
    const pilotName = faker.person.firstName();
  
    const flightDetails = {
      event: 'new-flight',
      time: new Date(),
      Details: {
        airLine: 'Royal Jordanian Airlines',
        destination: destination,
        pilot: pilotName,
        flightID: flightId,
      },
    };
  
    console.log('Manager: new flight with ID', flightId, 'has been scheduled');
    systemConnection.emit('new-flight', flightDetails);
  }, 10000);
  
  systemConnection.on('arrived', (flightDetails) => {
    console.log('Manager: we’re greatly thankful for the amazing flight,', flightDetails.Details.pilot);
  });