const state = {
    user:null,
    users:[],
    userById: null,
    noUserExist:false
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
    },
    async getAllUsers({rootState, commit})
    {
        const response = await rootState.baseAxios.get('auth/GetAll');
        commit('setUsers', response.data.data);
    },
    async getUserById({rootState,commit}, id)
    {
        const response = await rootState.baseAxios.get('auth/'+id);
        commit('setUserById', response.data.data);
    },
    async updateUser({rootState},updatedUser)
    {
        await rootState.authAxios.put('auth/UpdateByUser',updatedUser);
    
    },
    async updatePassword({rootState},updatedPassword)
    {
       const response = await rootState.authAxios.put('auth/UpdatePassword',updatedPassword);
        return response.data;
    },
    async blockUser({rootState}, id)
    {
        await rootState.baseAxios.put('auth/'+id);
        
    },
    async resetPassword({rootState,commit},email)
    {
        try {
        await rootState.baseAxios.post('auth/ResetPassword', {email});
        commit('setUserExistFalse');
        

            
        } catch (e) {
            if(e.response.status == 400)
            {
                commit('setUserExist');
            }
        }
    }
}
const mutations = {
    setUser: (state,user) => (state.user=user),
    setUsers: (state,users) => (state.users = users),
    setUserById: (state,user) => (state.userById = user),
    setUserExist: (state) => (state.noUserExist = true),
    setUserExistFalse: (state) => (state.noUserExist = false),

}
export default{
    actions,
    state,
    mutations
}