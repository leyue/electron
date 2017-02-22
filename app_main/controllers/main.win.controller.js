/**
 * Created by hasee on 2017/1/17.
 */
const electron = require("electron");
const url = require('url');
var fs = require('fs');

module.exports = function (app, mainWindow) {
	global.win = {
		close: function () {
            app.quit();
        },
		openDevTools: function () {
			// Open the DevTools.
			mainWindow.webContents.openDevTools();
		},
        loadURL: function (dict) {
			var path = usr.cfg.development?dict.pathname:'{0}/../../{1}'.format(__dirname, dict.pathname);
            console.log(path);
            mainWindow.loadURL(url.format({
                pathname: path,
                protocol: dict.protocol,
                slashes: true
            }));
        },
		// https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/dialog.md
        showOpenDialog: function (defaultPath, properties, filters, callback) {
			const dialog = electron.dialog;
			exports.openDialog = function (callback) {
				dialog.showOpenDialog({
					defaultPath: defaultPath,
					properties: properties,
					filters: filters
				}, function (res) {
					//res[0].toString()
					callback(res);
				})
			};
			exports.openDialog(callback);
		},
        showSaveDialog: function (defaultPath, filters, callback) {
            const dialog = electron.dialog;
            exports.openDialog = function (callback) {
                dialog.showSaveDialog({
                    defaultPath: defaultPath,
                    filters: filters
                }, function (res) {
                    //res[0].toString()
                    callback(res);
                })
            };
            exports.openDialog(callback);
        },
		isFileExist: function (path, callback) {
			fs.exists(path, function (exists) {
				callback(exists);
			});
		}
	};
};