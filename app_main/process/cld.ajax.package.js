/**
 * Created by hasee on 2017/1/20.
 *
 * 模拟ajax请求
 * main.send: req:{url: '', data: {}, success: null, error: null}
 * cld.send: res:{url: '', head: {status: 0, info: ''}, data: {}}
 * main.handle: success(data), error(data)
 */

module.exports = {
	package: function (id, url, status, info, data) {
		return {
			id: id,
			url: url,
			head: {
				status: status,
				info: info
			},
			data: data
		}
	}
};