const state = {
    ordersByUser: [],
    ordersForUser: [],
    oredrById:{},
    orders:[]
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
        
    },
    async getOrderById({rootState,commit},id)
    {
       const  response = await rootState.authAxios.get("Order/"+id);
       commit("setOrderById", response.data.data)

    },
    async setConfirm({rootState}, newConfrim)
    {
       const  response = await rootState.authAxios.put("Order", newConfrim);
       return response.data.data;

    },
    async refuseOrder({rootState}, newRefuse)
    {
        await rootState.authAxios.put("Order/SetRefuseOrder",newRefuse);
    },
    async searchOrders({rootState, commit}, reportSearchModel)
    {
        const response = await rootState.baseAxios.post("Order/GetOrdersForIndex", reportSearchModel);
        commit("setOrders", response.data.data);
    }

}
const mutations = {
    setOrdersByUser:(state,ordersByUser) => (state.ordersByUser=ordersByUser),
    setOrdersForUser: (state,ordersForUser) => (state.ordersForUser=ordersForUser),
    setOrderById: (state,oredrById) => (state.oredrById=oredrById),
    setOrders: (state,orders) => (state.orders = orders)

}

export default{
    state,
    actions,
    mutations
}