/**
 * Created by hasee on 2017/1/20.
 *
 * req:{type: '', paras: []}
 *
 * res:{type: '', head: {ret: 0, info: ''}, data: {}}
 */
require('../log')();
require('../inject')();
var ajax = require('./cld.ajax.package');
var FullScan = require('../models/fullScan.main.model');

let fullScan = new FullScan();

process.on('message', function (req) {
    console.log('>', req);
    var id = req.id;
    switch (req.url) {
        case usr.route.process.fullScan.getDirScheme: {
            fullScan.getDirScheme(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
        case usr.route.process.fullScan.getFileData: {
            fullScan.getFileData(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
    }
});

