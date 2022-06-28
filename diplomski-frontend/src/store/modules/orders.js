const state = {
    ordersByUser: [],
    ordersForUser: [],

}

const actions ={
    async addOrder({rootState},newOrder)
    {
         await rootState.authAxios.post("Order", newOrder);
    },
    async getAllOrdersByUser({rootState, commit})
    {
        const response = await rootState.authAxios.get(`Order/GetByUser`);
       
        commit("setOrdersByUser", response.data.data)
        
    },
    async getAllOrdersForUser({rootState, commit})
    {
        const response = await rootState.authAxios.get(`Order/GetForUser`);
       
        commit("setOrdersForUser", response.data.data)
        
    }

}
const mutations = {
    setOrdersByUser:(state,ordersByUser) => (state.ordersByUser=ordersByUser),
    setOrdersForUser: (state,ordersForUser) => (state.ordersForUser=ordersForUser)
}

export default{
    state,
    actions,
    mutations
}