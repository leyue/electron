/**
 * Created by hasee on 2017/1/20.
 */
const SqlBase = require('./sql.main.base');
const Promise = require("bluebird");

class TRD extends SqlBase {
    constructor() {
        super();
    }

    getProjects(callback) { // callback(err, res)
        try {
            var cmd = 'Select seq_name From session group by seq_name Limit 100';
            this.all(cmd, function (err, res) {
                var data = [];
                if (!err) {
                    for (var idx in res) {
                        data.push(res[idx].seq_name);
                    }
                }
                callback(err, data);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getResultCnt(data, callback) {
        try {
            var condition = 'where ';
            if (data.sn1) {
                condition += 'df.SN1="{0}" and '.format(data.sn1);
            }
            if (data.project) {
                condition += 's.seq_name="{0}" and '.format(data.project);
            }
            if (data.dut) {
                condition += 's.dut_index={0} and '.format(data.dut);
            }
            if (data.start_time) {
                condition += 't.start_time > "{0}" and '.format(data.start_time);
            }
            if (data.end_time) {
                condition += 't.end_time < "{0}" and '.format(data.end_time);
            }
            condition = condition == 'where ' ? '' : condition.slice(0, -4);
            var cmd =
                'Select count(*) as cnt From test_result as t ' +
                'inner join dut_info as df on t.dut_id = df.dut_id ' +
                'inner join session as s on t.session_id = s.session_id ' +
                '{0} '.format(condition);
            this.all(cmd, function (err, res) {
                var rowCnt = 0;
                if (!err) {
                    rowCnt = res[0].cnt;
                }
                callback(err, rowCnt);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getResult(data, callback) {
        try {
            var condition = 'where ';
            if (data.sn1) {
                condition += 'df.SN1="{0}" and '.format(data.sn1);
            }
            if (data.project) {
                condition += 's.seq_name="{0}" and '.format(data.project);
            }
            if (data.dut) {
                condition += 's.dut_index={0} and '.format(data.dut);
            }
            if (data.start_time) {
                condition += 't.start_time > "{0}" and '.format(data.start_time);
            }
            if (data.end_time) {
                condition += 't.end_time < "{0}" and '.format(data.end_time);
            }
            condition = condition == 'where ' ? '' : condition.slice(0, -4);
            var cmd =
                'Select ' +
                'df.SN1 as sn1, ' +
                's.seq_name as project, s.dut_index as dut, ' +
                't.test_id, t.error_code, t.error_item, t.description as desc, t.repair_code, t.start_time, t.end_time ' +
                'From test_result as t ' +
                'inner join dut_info as df on t.dut_id = df.dut_id ' +
                'inner join session as s on t.session_id = s.session_id ' +
                '{0} '.format(condition) +
                '{0} '.format(data.order_by) +
                'Limit {0}'.format(data.limit);
            this.all(cmd, function (err, res) {
                var data = [];
                if (!err) {
                    for (var idx in res) {
                        data.push({
                            test_id: res[idx].test_id,
                            sn1: res[idx].sn1,
                            project: res[idx].project,
                            dut: res[idx].dut,
                            error_code: res[idx].error_code,
                            error_item: res[idx].error_item,
                            desc: res[idx].desc,
                            repair_code: res[idx].repair_code,
                            start_time: res[idx].start_time,
                            end_time: res[idx].end_time
                        });
                    }
                }
                callback(err, data);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getResultDetailsCnt(data, callback) {
        try {
            var condition = 'where ';
            if (data.test_id) {
                condition += 't.test_id="{0}" and '.format(data.test_id);
            }
            condition = condition == 'where ' ? '' : condition.slice(0, -4);
            var cmd =
                'Select count(*) as cnt From test_info as t ' +
                '{0} '.format(condition);
            this.all(cmd, function (err, res) {
                var rowCnt = 0;
                if (!err) {
                    rowCnt = res[0].cnt;
                }
                callback(err, rowCnt);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getResultDetails(data, callback) {
        try {
            var condition = 'where ';
            if (data.test_id) {
                condition += 't.test_id={0} and '.format(data.test_id);
            }
            condition = condition == 'where ' ? '' : condition.slice(0, -4);
            var cmd =
                'Select i.name as item, t.band, t.channel, t.condition, t.lower, t.value, t.upper, t.result, t.unit ' +
                'From test_info as t ' +
                'inner join item_name as i on t.name_id = i.item_name_index ' +
                '{0} '.format(condition) +
                '{0} '.format(data.order_by) +
                'Limit {0}'.format(data.limit);
            this.all(cmd, function (err, res) {
                var data = [];
                if (!err) {
                    for (var idx in res) {
                        data.push({
                            item: res[idx].item,
                            band: res[idx].band,
                            channel: res[idx].channel,
                            condition: res[idx].condition,
                            lower: res[idx].lower,
                            value: res[idx].value,
                            upper: res[idx].upper,
                            result: res[idx].result,
                            unit: res[idx].unit
                        });
                    }
                }
                callback(err, data);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getTop6FailRateProjects(data, callback) {
        try {
            var that = this;
            var condition = 'and ';
            if (data.start_time) {
                condition += 't.start_time > "{0}" and '.format(data.start_time);
            }
            if (data.end_time) {
                condition += 't.end_time < "{0}" '.format(data.end_time);
            }
            condition = condition == 'and ' ? '' : condition;
            var projects = data.projects;
            var projectsInfo = {};
            var ps = [];
            for (var idx in projects) {
                var project_name = projects[idx];
                (function (project_name) {
                    ps.push(new Promise((resolve, reject) => {
                        var cmd =
                            'Select count(*) as cnt ' +
                            'From test_result as t ' +
                            'inner join session as s on t.session_id = s.session_id ' +
                            'where s.seq_name = "{0}" '.format(project_name) +
                            '{0} '.format(condition);
                        that.all(cmd, function (err, res) {
                            projectsInfo[project_name] = {
                                cnt: res[0].cnt.toString(),
                                errCnt: 0,
                                failRate: 0
                            };
                            cmd =
                                'Select count(*) as cnt ' +
                                'From test_result as t ' +
                                'inner join session as s on t.session_id = s.session_id ' +
                                'where s.seq_name = "{0}" '.format(project_name) +
                                'and t.error_code != 0 ' +
                                '{0} '.format(condition);
                            that.all(cmd, function (err, res) {
                                projectsInfo[project_name].errCnt = res[0].cnt.toString();
                                resolve();
                            });
                        });
                    }));
                })(project_name);
            }
            Promise.all(ps).then(() => {
                var projects = Object.keys(projectsInfo);
                var temp = [];
                for (var idx in projects) {
                    var project = projects[idx];
                    var failRate = parseFloat((projectsInfo[project].errCnt * 100 / projectsInfo[project].cnt).toFixed(2));
                    failRate =
                        temp.push({
                            name: project,
                            failRate: failRate
                        });
                }
                temp.sort(function (a, b) {
                    if (a.failRate > b.failRate) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                var result = {
                    projects: [],
                    data: []
                };
                for (var idx in temp) {
                    if(idx>6) {
                        break;
                    }
                    result.projects.push(temp[idx].name);
                    result.data.push(temp[idx].failRate);
                }
                callback(null, result);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    getTop10FailItems(data, callback) {
        try {
            var that = this;
            var condition = 'and ';
            if (data.start_time) {
                condition += 't.start_time > "{0}" and '.format(data.start_time);
            }
            if (data.end_time) {
                condition += 't.end_time < "{0}" '.format(data.end_time);
            }
            condition = condition == 'and ' ? '' : condition;
            var project_name = data.project;
            var itemDict = {};
            var cmd =
                'Select t.error_item as error_item ' +
                'From test_result as t ' +
                'inner join session as s on t.session_id = s.session_id ' +
                'where s.seq_name = "{0}" '.format(project_name) +
                'and error_item != "" ' +
                '{0} '.format(condition);
            that.all(cmd, function (err, res) {
                for (var idx in res) {
                    var error_item = res[idx].error_item.toString();
                    if (!itemDict[error_item]) {
                        itemDict[error_item] = {
                            cnt: 0
                        }
                    }
                    itemDict[error_item].cnt++;
                }
                var items = Object.keys(itemDict);
                var temp = [];
                for (var idx in items) {
                    var item = items[idx];
                    temp.push({
                        name: item,
                        cnt: itemDict[item].cnt
                    });
                }
                temp.sort(function (a, b) {
                    if (a.cnt > b.cnt) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                var result = {
                    items: [],
                    data: []
                };
                for (var idx in temp) {
                    if(idx>10) {
                        break;
                    }
                    result.items.push(temp[idx].name);
                    result.data.push(temp[idx].cnt);
                }
                callback(null, result);
            });
        } catch (err) {
            callback(err, null);
        }
    }
}

module.exports = TRD;

if (require.main === module) {
    require('../inject')();

    var trd = new TRD();
    trd.open({dbPath: 'H:/databse/TRD_DUT0.db'}, function () {
        // trd.getTop6FailRateProjects({projects:['演示调试', 'SC9860+SR3595']}, function (err, res) {
        //     console.log(res);
        // });
        trd.getTop10FailItems({project: '演示调试'}, function (err, res) {
            console.log(res);
        });
    });
}
