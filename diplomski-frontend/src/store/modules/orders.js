const state = {
    orders: []
}

const actions ={
    async addOrder({rootState},newOrder)
    {
         await rootState.authAxios.post("Order", newOrder);
    },

}
const mutations = {

}

export default{
    state,
    actions,
    mutations
}