/**
 * Created by hasee on 2017/1/20.
 */
const path = require('path');

module.exports = function () {
    global.usr.route.render = {
        navigation: {
            pathname: path.join(usr.cfg.development ? 'localhost:8080/' : './render/navigation/dist/index.html'),
            protocol: usr.cfg.development ? 'http:' : 'file:',
            slashes: true
        },
        simba: {
            chart: {
                pathname: path.join(usr.cfg.development ? 'localhost:8080/' :  './render/simba-chart/dist/index.html'),
                protocol: usr.cfg.development ? 'http:' : 'file:',
                slashes: true
            },
            full_scan: {
                pathname: path.join(usr.cfg.development ? 'localhost:8080/' :  './render/simba-full-scan/dist/index.html'),
                protocol: usr.cfg.development ? 'http:' : 'file:',
                slashes: true
            }
        },
        pandora: {

        }
    }
};

if (require.main == module) {
    console.log(__dirname);
}