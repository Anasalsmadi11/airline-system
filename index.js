// const uuid = require('uuid');
// const faker = require('faker');

// function generateFakeFlight() {
// const flightId = uuid.v4();
// const airline = faker.company.companyName();
// const destination = faker.address.city();
// const pilotName = faker.name.findName();

// const fakeFlight = {
//     event: 'took_off',
//     time: new Date('2022-02-28T15:30:00'),
//     details: {
//     airline: airline,
//     destination: destination,
//     pilot: pilotName,
//     flightID: flightId,
//     },
// };

// return fakeFlight;
// }
// console.log(generateFakeFlight());


const Events = require('events');
// const uuid = require('uuid');
const {faker} = require('@faker-js/faker')
const { v4: uuidv4 } = require('uuid');


// Create a shared event instance
const eventEmitter = new Events();

// Manager
// setInterval(() => {
//   const flightId = uuid.v4();
//   const airline = faker.company.companyName();
//   // const destination = faker.address.city();
//   const pilotName = faker.name.findName();

//   const flightDetails = {
//     event: 'new-flight',
//     time: new Date(),
//     Details: {
//       airLine: airline,
//       // destination: destination,
//       pilot: pilotName,
//       flightID: flightId,
//     },
//   };

//   console.log('Manager: new flight with ID', flightId, 'has been scheduled');
//   eventEmitter.emit('new-flight', flightDetails);
// }, 10000);
setInterval(() => {
  const flightId = uuidv4();
  // const airline = faker.company.companyName();
  // const destination = faker.address.city();
  const pilotName = faker.person.firstName();

  const flightDetails = {
    event: 'new-flight',
    time: new Date(),
    Details: {
      airLine: 'Royal Jordanian Airlines',
      // destination: destination,
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

// Pilot
eventEmitter.on('new-flight', (flightDetails) => {
  setTimeout(() => {
    console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'took-off');
    flightDetails.event = 'took_off';
    flightDetails.time = new Date();
    eventEmitter.emit('took-off', flightDetails);
  }, 4000);

  setTimeout(() => {
    console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'has arrived');
    flightDetails.event = 'arrived';
    flightDetails.time = new Date();
    eventEmitter.emit('arrived', flightDetails);
  }, 7000);
});

// System
eventEmitter.on('new-flight', (flightDetails) => {
  console.log('Flight', flightDetails);
});

eventEmitter.on('took-off', (flightDetails) => {
  console.log('Flight', flightDetails);
});

eventEmitter.on('arrived', (flightDetails) => {
  console.log('Flight', flightDetails);
});




// let counter=0
// setInterval(() => {
//     counter++
//     console.log("sDsds", counter)
// }, 3000);
