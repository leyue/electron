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
var TRD = require('../models/trd.main.model');

let trd = new TRD();

process.on('message', function (req) {
	console.log('>', req);
    var id = req.id;
	switch (req.url) {
		case usr.route.process.SQL.OPEN_DB: {
			trd.open(req.data, function () {
				process.send(ajax.package(id, req.url, 0, null, null));
			});
			break;
		}
		case usr.route.process.SQL.QUERY_CMD: {
			trd.all(req.data.cmd, function (err, res) {
				process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
			});
			break;
		}
		case usr.route.process.SQL.GET_PROJECTS: {
			trd.getProjects(function (err, res) {
				process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
			});
			break;
		}
        case usr.route.process.SQL.GET_RESULTS_CNT: {
            trd.getResultCnt(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
		case usr.route.process.SQL.GET_RESULTS: {
			trd.getResult(req.data, function (err, res) {
				process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
			});
			break;
		}
        case usr.route.process.SQL.GET_RESULT_DETAILS_CNT: {
            trd.getResultDetailsCnt(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
        case usr.route.process.SQL.GET_RESULT_DETAILS: {
            trd.getResultDetails(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
        case usr.route.process.SQL.GET_PROJECTS_FAIL_RATE: {
            trd.getTop6FailRateProjects(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
        case usr.route.process.SQL.GET_PROJECT_ERROR_ITEM: {
            trd.getTop10FailItems(req.data, function (err, res) {
                process.send(ajax.package(id, req.url, err ? -1 : 0, err, res));
            });
            break;
        }
	}
});

