const url = "http://127.0.0.1:5000";
const timeout = 10000;
import store from '../store/index.js'
import {
	getCustomerInfoByToken
} from '@/apis/customerInfo.js'

export default (config) => {
	return new Promise(async (resolve, reject) => {
		if (!config.header) {
			config.header = {}
		}
		// console.log(store)
		let token = ""
		if (store.state.user.token != "") {
			token = store.state.user.token
		} else {
			token = uni.getStorageSync('token');
			if (token) {
				store.commit('user/SET_TOKEN', token)
				getCustomerInfoByToken().then(res => {
					if (res.code == 200) {
						store.commit('user/SET_USERINFO', res.data)
					}
				})
			}
		}
		if (token) {
			config.header["token"] = token;
		}
		config.url = `${url}${config.url}`
		const contentType = config.header["Content-Type"] ? config.header["Content-Type"] : '';
		if (contentType == "") {
			// config.header = {}
			config.header["Content-Type"] = "application/x-www-form-urlencoded"
		} else {
			config.header["Content-Type"] = contentType;
		}
		if (contentType == "application/x-www-form-urlencoded") {
			let ret = "";
			// console.log(config)
			for (const it in config.data) {
				const y = config.data[it];
				if (
					y === "null" ||
					y === null ||
					y === "" ||
					typeof y === "undefined" ||
					(y instanceof Object && Object.keys(y).length == 0)
				) {
					console.log(1);
				} else {
					ret +=
						encodeURIComponent(it) +
						"=" +
						encodeURIComponent(config.data[it]) +
						"&";
				}
			}
			config.data = ret;
		}
		if (config.header["Content-Type"] == "application/json") {
			if (typeof config.data == "object") {
				for (const it in config.data) {
					const y = config.data[it];
					if (
						y === "null" ||
						y === null ||
						y === "" ||
						typeof y === "undefined" ||
						(y instanceof Object && Object.keys(y).length == 0)
					) {
						delete config.data[it];
					}
				}
			}
		}
		const data = await uni.request({ ...config
		})
		const [error, res] = data
		if (error == null) {
			if (res.data.code == 200) {
				resolve(res.data)
			} else {
				if (res.data.code == 52000 || res.data.code == 52001 || res.data.code == 50012) {
					uni.removeStorageSync('token')
					const data = {
						alias: "",
						token: "",
						phone: "",
						avatar: ""
					}
					store.commit('user/SET_TOKEN', data)
					reject(res.msg)
					uni.navigateTo({
						url: '/pages/login/index',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		} else {
			reject(error)
		}

	})
}
