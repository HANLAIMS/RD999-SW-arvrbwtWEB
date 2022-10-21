const constants = {
    state: {
        constants: {
            backend:'http://127.0.0.1:3000'
        }
    },
    getters: {
        CONSTANTS: state =>{
            return state.constants
        }
    },
}

export default constants