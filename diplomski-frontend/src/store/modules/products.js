const state ={
    products: []
}
const actions = {
    async GetProductsForIndex({rootState, commit}, searchModel)
    {
        const response = await rootState.baseAxios.post(`ProductContorller/GetProductsForIndex`, searchModel);

        commit("setProducts", response.data.data)
    }

}
const mutations = {
    setProducts:(state,products) => (state.products=products)
}
export default{
    state,
    actions,
    mutations
}