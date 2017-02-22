/**
 * Created by hasee on 2017/2/21.
 */

(async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    await new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 3000);
    });
    console.log('end');
})();