// console.log('Before timeout');

// setTimeout(function () {
//     console.log('Set timeout over');
// }, 0);

// setImmediate(function () {
//     console.log('Run Immediate call');
// });

// setTimeout(function () {
//     console.log('Another timeout over');
// }, 0);

// console.log('After set immediate');

const interval = setInterval(() => {
    console.log('tik');
}, 1000);

setTimeout(() => {
    clearInterval(interval);
}, 4000);