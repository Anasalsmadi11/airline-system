const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');
// const events = require('./events');
// const events = new EventEmitter();

// setInterval(() => {
//   const flightID = uuidv4();
//   const pilot = faker.person.firstName();
//  const destination = faker.location.city()
//   const flight = {
//     event: 'new-flight',
//     time: new Date().toISOString(),
//     details: {
//       airline: 'Royal Jordanian Airlines',
//       flightID,
//       pilot,
//       destination
//     }
//   };
//   events.emit('new-flight', flight);
// }, 2000);

// events.on('new-flight', (flight) => {
//   console.log(`New flight with ID '${flight.details.flightID}' has been scheduled`);
//   console.log('Flight:', flight);
// });
// events.on('arrived', (flightDetails) => {
//     console.log(`Manager: We're greatly thankful for the amazing flight, ${flightDetails.pilot}`);
//   });
//   module.exports=events;


require('./pilot')
require('./system')
const eventEmitter = require('./events');

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
    eventEmitter.emit('new-flight', flightDetails);
  }, 10000);
  
  eventEmitter.on('arrived', (flightDetails) => {
    console.log('Manager: we’re greatly thankful for the amazing flight,', flightDetails.Details.pilot);
  });