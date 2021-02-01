const state = {
	alias: "",
	token: "",
	phone: "",
	avatar: ""
}

const actions = {}

const mutations = {
	SET_USERINFO(state, data) {
		state.alias = data.alias
		state.token = data.token
		state.phone = data.phone
		state.avatar = data.avatar
	},
	
	SET_TOKEN(state, data) {
		state.token = data
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
