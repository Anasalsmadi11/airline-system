const Events = require('events');
const eventsPool = new Events(); // eventsPool is an object that store every event happen in frontend(like hitting button)

module.exports = eventsPool;