const alarm = process.argv.slice(2).map((num) => num * 1000);

// process.stdout.write("\x07");
let index = 0;
const timer = () => {
  if (index < alarm.length) {
    setTimeout(() => process.stdout.write("\x07"), alarm[index]);
    index++;
    timer();
  }
}

timer();