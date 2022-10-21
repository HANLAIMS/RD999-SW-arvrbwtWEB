const trendDatasetStore = {
	state: {
		visible: false,
		tag: null,
		values: null,
		labels: null
	},
	mutations: {
		UPDATE_VALUES(state, payload) {
			state.values = payload
		},
		UPDATE_LABELS(state, payload) {
			state.labels = payload
		},
		UPDATE_VISIBLE(state, payload) {
			state.visible = payload
		},
		UPDATE_TAG(state, payload) {
			state.tag = payload
		},
	},
	actions: {
		update_values({ commit }, $data) {
			commit('UPDATE_VALUES', $data)
		},
		update_labels({ commit }, $data) {
			commit('UPDATE_LABELS', $data)
		},
		update_visible({ commit }, $data) {
			commit('UPDATE_VISIBLE', $data)
		},
		update_tag({ commit }, $data) {
			commit('UPDATE_TAG', $data)
		},
	},
	getters: {
		//'get_fullname': state => state.fullName + 'get'
	}
}

export default trendDatasetStore