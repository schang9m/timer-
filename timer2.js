let alarm = process.argv.slice(2).map((num) => num * 1000);
const stdin = process.stdin;
var readline = require('readline');

readline.emitKeypressEvents(process.stdin);

// process.stdout.write("\x07");

// if (process.stdin.isTTY)
//     process.stdin.setRawMode(true);

process.stdin.on('keypress', (chunk, key) => {
  if (key && key.name == 'b') {
    process.stdout.write("\x07");
  }
  if (key && key.name == '\u0003') {
    exitHandler();
  }
  if (key && key.sequence && !isNaN(parseInt(key.sequence))) {
    alarm.push(parseInt(key.sequence) * 1000);
    if (alarm.length === 1) {
      timer();
    }
  }
});

let index = 0;
const timer = () => {
  if (index < alarm.length) {
    console.log(`setting timer for ${alarm[index] /1000} seconds...`)
    setTimeout(() => process.stdout.write("\x07"), alarm[index]);
    index++;
    timer();
  }
}
const exitHandler = () => {
  console.log('Thanks for using me, ciao!');
  process.exit();
}
process.on('SIGINT', exitHandler);

timer();