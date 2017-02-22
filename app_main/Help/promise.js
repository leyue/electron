/**
 * Created by hasee on 2017/2/7.
 */
const Promise = require("bluebird");

// console.time('spend');
// var p1 = Promise.reject(3);
// var p2 = 1337;
// var p3 = new Promise((resolve, reject) => {
//     setTimeout(reject, 3000, 'foo');
// });
// var p4 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2500, 'foo');
// });
//
// Promise.all([p1, p2, p3, p4]).then(values => {
//     console.log(values); // [3, 1337, "foo"]
//     console.timeEnd('spend');
// }, err=>{
//     console.log('xxxxxxerr', err); // [3, 1337, "foo"]
// });

console.time('spend');
var data = 0;
Promise.coroutine(function*() {
    for (var i = 0; i < 1; i++) {
        yield new Promise((resolve, reject) => {
            data++;
            console.log('>>>>0', data);
            setTimeout(resolve, 3000, 'foo');
        });
        yield new Promise((resolve, reject) => {
            data++;
            console.log('>>>>1', data);
            setTimeout(resolve, 2000, 'foo');
        });
    }
})().then(
    function () {
        console.log('success', data);
        console.timeEnd('spend');
    },
    function () {
        console.log('error', data);
    }
);
