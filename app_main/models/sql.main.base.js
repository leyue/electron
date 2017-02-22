/**
 * Created by hasee on 2017/1/20.
 */
var Sqlite = require('sqlite3').verbose();

class SqlBase {
	constructor() {
		this.db = null;
	}

	close() {
		if (this.db) {
			this.db.close();
		}
	}

	open(data, callback) {
		this.close();
		this.db = new Sqlite.Database(data.dbPath);
		callback();
	}

	run(cmd, callback) { //callback()
		this.db.run(cmd, callback);
	}

	all(cmd, callback) { //callback(err, res)
		console.log(cmd);
		this.db.all(cmd, callback);
	}

	each(cmd, callback) { //callback(err, row)
		this.db.serialize(function () {
			this.db.each(cmd, callback);
		});
	}
}

module.exports = SqlBase;