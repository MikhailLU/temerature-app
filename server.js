const dweetClient = require('node-dweetio');
const five = require('johnny-five');

const board = new five.Board({
  port: "COM4"
});
const dweetio = new dweetClient();

board.on('ready', () => {
  const temperatureSensor = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  temperatureSensor.on('change', (value) => {
    const dweetThing = 'node-temperature-monitor';
    const tweetMessage = {
      temperature: +value.celsius.toFixed(2)
    };

    dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet) => {
      if (err) {
        console.log('[Error]: ', err);
      }
      if (dweet) {
        console.log(dweet.content);
      }
    });
  });
});