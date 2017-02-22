/**
 * Created by hasee on 2017/1/20.
 *
 * 模拟ajax请求
 * main.send: req:{url: '', data: {}, success: null, error: null}
 * cld.send: res:{url: '', head: {status: 0, info: ''}, data: {}}
 * main.handle: success(data), error(data)
 *
 * 遇到channel close 速度子进程try catch 打log
 * 子进程 没有使用electron的权限 切记 (const electron = require('electron');不能调用)
 */
const childProcess = require('child_process');

class Master {
    constructor(jsPath) {
        var that = this;
        this.child = childProcess.fork(jsPath, {silent: true});
        this.child.stdout.setEncoding('utf8');
        this.child.stdout.on('data', function (data) {
            console.log(data);
        });
        this.child.stderr.setEncoding('utf8');
        this.child.stderr.on('data', function (data) {
            console.log(data);
        });
        this.callbackDict = {};
        this.child.on('message', function (res) {
            // console.log('<', res);
            if (res.head.status != 0) {
                if (that.callbackDict[res.id].error) {
                    that.callbackDict[res.id].error(res.head.info);
                }
            } else {
                if (that.callbackDict[res.id].success) {
                    that.callbackDict[res.id].success(res.data);
                }
            }
        });
    }

    ajax(dict) {
        var id = Math.uuid();
        this.callbackDict[id] = {
            success: dict.success,
            error: dict.error,
        };
        this.child.send({
            id: id,
            url: dict.url,
            data: dict.data
        });
    }
}

// module.exports = {
//     sql: new Master(__dirname + '/../process/cld.sql.handle.js'),
//     fullScan: new Master(__dirname + '/../process/cld.fullScan.handle.js')
// };

module.exports = Master;

if (require.main === module) {
    require('../inject')();
    var fullScan = new Master(__dirname + '/../process/cld.fullScan.handle.js');
    fullScan.ajax({
        url: '/fullScan/getDirScheme',
        data: {rootDir: 'H:/databse/full-scan/AGC'},
        success: function (data) {
            console.log('success');
        },
        error: function (err) {
            console.log('err');
        }
    });
}