const state = {
    user:null
}

const actions = {
    async registerUser({rootState}, model)
    {
        const response = await rootState.baseAxios.post("auth/register", model);
        return response;
    },
    async loginUser({rootState, commit}, model)
    {
        const response = await rootState.baseAxios.post("auth/login", model);
        commit("setAuthAxiosHeader", "Bearer " +response.data.data, {root:true})
        return response;
    },
    async getUserByUser({commit,rootState})
    {
        const response = await rootState.authAxios.get('auth/getbyuser');
        commit('setUser', response.data.data)
    }
}
const mutations = {
    setUser: (state,user) => (state.user=user)
}
export default{
    actions,
    state,
    mutations
}