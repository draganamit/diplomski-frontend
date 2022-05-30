const state ={
    products: [],
    searchModel:
    {
        paageNum: 1,
        pageSize: 8,
        categoryId:null
    },
}
const actions = {
    async GetProductsForIndex({rootState, commit}, searchModel)
    {
        const response = await rootState.baseAxios.post(`ProductContorller/GetProductsForIndex`, searchModel);

        commit("setProducts", response.data.data)
    },
  
}
const mutations = {
    setProducts:(state,products) => (state.products=products),
    setSearchModel:(state, model)=> {
        state.searchModel = model;
    }

}
export default{
    state,
    actions,
    mutations
}