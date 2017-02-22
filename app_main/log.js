/**
 * Created by hasee on 2017/1/23.
 */
module.exports = function () {
    var fs = require('fs');
    global.log = {
        out: function (text) {
            fs.appendFile('d:/app_main.txt', text+' \r\n', function(err){});
        }
    }
};