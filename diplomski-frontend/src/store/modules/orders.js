const state = {
    ordersByUser: [],
    ordersForUser: [],
    oredrById:{}
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
    async deleteOrder({rootState}, id)
    {
        await rootState.authAxios.delete("Order/"+id);
    }

}
const mutations = {
    setOrdersByUser:(state,ordersByUser) => (state.ordersByUser=ordersByUser),
    setOrdersForUser: (state,ordersForUser) => (state.ordersForUser=ordersForUser),
    setOrderById: (state,oredrById) => (state.oredrById=oredrById)

}

export default{
    state,
    actions,
    mutations
}