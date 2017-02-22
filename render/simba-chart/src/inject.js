/**
 * Created by hasee on 2017/1/23.
 */
module.exports = function () {
  require('../../../app_main/inject')();
  var remote = usr.cfg.electron.enable?require('electron').remote:null;

  // global.Promise = require("bluebird");
  global.usr.ctrl = {
    win: {
      close: remote.getGlobal('win').close,
      openDevTools: remote.getGlobal('win').openDevTools,
      loadURL: remote.getGlobal('win').loadURL,
      showOpenDialog: remote.getGlobal('win').showOpenDialog,
      isFileExist: remote.getGlobal('win').isFileExist,
    },
    sql: {
      ajax: remote.getGlobal('sql').ajax,
    }
  };
};

