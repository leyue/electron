/**
 * Created by hasee on 2017/1/19.
 */
const Master = require('../process/master.ajax.handle.js');

module.exports = function (mainWindow) {
    var master = new Master(__dirname + '/../process/cld.fullScan.handle.js');
    global.fullScan = {
        ajax: function (options) {
            master.ajax(options);
        }
    };
};

if (require.main === module) {
    require('../../app_main/log')();
    log.out('xxxxxx');
}

