const EventEmitter = require('events');
const emitter = new EventEmitter();

//listener 1
emitter.on('start', () => {
  console.log('Application Started!');
});

const data = {name:"Lolens", age: 21};

// listener 2
emitter.on('data', (data) => {
    console.log(`Name: ${data.name}`);
    console.log(`Age: ${data.age}`);
}); 

emitter.on('error', (error) => {
    console.log(`Error occured: ${error}`);
});

emitter.emit('start');
emitter.emit('data', data);
emitter.emit('error', "sample error message");