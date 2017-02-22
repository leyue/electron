/**
 * Created by hasee on 2017/2/17.
 */
const Promise = require("bluebird");
const fs = require('fs');

class FullScan {
    constructor() {

    }

    getDirScheme(data, callback) {
        try {
            var rootDir = data.rootDir;
            var files = fs.readdirSync(rootDir);
            var data = {};
            for (var i in files) {
                var standard = files[i];
                var dir = '{0}/{1}'.format(rootDir, standard);
                var subFiles = fs.readdirSync(dir);
                data[standard] = {}
                for (var j in subFiles) {
                    var module = subFiles[j];
                    dir = '{0}/{1}/{2}'.format(rootDir, standard, module);
                    var subSubFiles = fs.readdirSync(dir);
                    if (subSubFiles) {
                        data[standard][module] = subSubFiles[0];
                    }
                }
            }
            callback(null, data);
        } catch (err) {
            callback(err, null);
        }
    }

    getFileData(data, callback) {
        try {
            var path = data.path;
            fs.readFile(path, 'utf-8', function (err, data) {
                var regExp = /[\r\n,]/;
                var lst = data.split(regExp).filter(function (item) {
                    return item ? true : false;
                });
                var channel = {};
                var band = null;
                for (var i = 0; i < lst.length; i++) {
                    var item = lst[i];
                    if (!item) {
                        continue;
                    }
                    if (item.startsWith('Channel')) {
                        band = 'C' + item.split('=')[1].trim();
                        channel[band] = {
                            desc: '',
                            data: []
                        };
                        do {
                            channel[band].desc += item + '\n';
                            item = lst[i++];
                        } while (!item.startsWith('==='));
                    } else {
                        if (!band) {
                            continue;
                        }
                        channel[band].data.push([
                            parseInt(item.split(';')[0].split('=')[1].trim()),
                            parseFloat(item.split(';')[1].split('=')[1].trim())
                        ]);
                    }
                }
                var data = [];
                for(var key in channel) {
                    data.push({
                        name: key,
                        data: channel[key].data
                    })
                }
                callback(null, data);
            })
        } catch (err) {
            callback(err, null);
        }
    }
}

module.exports = FullScan;

if (require.main == module) {
    require('../inject')();

    fullScan = new FullScan();
    fullScan.getDirScheme({rootDir: 'H:/databse/full-scan/WCDMA/APT'}, function (err, data) {
        console.log(err, data);
    });
    fullScan.getFileData({path: 'H:/databse/full-scan/GSM/AFC/G_AFC_Band2.log'}, function (err, data) {
        console.log(err, data);
    });
}