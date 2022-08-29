export default {
    state: {
        token: '',
       
    },
    mutations: {
        setToken(state,val) {
            state.token=val
            localStorage.setItem('token',val)
        },
        clearToken(state){
            state.token=''
            localStorage.removeItem('token')
        },
        getToken(state){
            //如果state.token已有token就直接拿，否则获取token
            state.token=state.token || localStorage.getItem('token')
        }

    
    }
}