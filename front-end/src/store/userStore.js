const userStore = {
    state: {
        isSignIn: false,
        fullName: '{"fullname":"초기값"}',
        userInfo:'{"fullname":"초기값", "initial":"IV",}'
    },
    mutations: {
        UPDATE_SIGN_IN(state,payload){
            state.isSignIn = payload
        },
        UPDATE_FULLNAME(state,payload){
           state.fullName = payload
        },
        UPDATE_USER_INFO(state,payload){
            state.userInfo = payload
        },
    },
    actions: {
        update_sign_in({commit}, $data) {
            commit('UPDATE_SIGN_IN', $data)
        },
        update_fullname({commit}, $data) {
           commit('UPDATE_FULLNAME', $data)
        },
        update_user_info({commit}, $data) {
            commit('UPDATE_USER_INFO', $data)
        },
    },
    getters: {
        //'get_fullname': state => state.fullName + 'get'
    }
}

export default userStore