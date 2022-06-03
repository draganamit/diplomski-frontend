const state ={
    products: [],
    searchModel:
    {
        pageNum: 1,
        pageSize: 8,
        categoryId:null,
        priceFrom: null,
        priceTo: null,
        location: null,
        name: null,
        userId:null
    },
}
const actions = {
    async GetProductsForIndex({rootState, commit}, searchModel)
    {
        const response = await rootState.baseAxios.post(`ProductContorller/GetProductsForIndex`, searchModel);

        commit("setProducts", response.data.data)
    },
    async addProduct({rootState},newProduct)
    {
         await rootState.authAxios.post("ProductContorller", newProduct);
        // commit("setNewProduct", response.data.data);
    },
    async updateProduct({rootState, commit},updatedProduct)
    {
        const response = await rootState.authAxios.put("ProductContorller", updatedProduct);
        commit("setUpdatedProduct", response.data.data);
    }
  
}
const mutations = {
    setProducts:(state,products) => (state.products=products),
    setSearchModel:(state, model)=> {
        state.searchModel = model;
    },
   // setNewProduct: (state,product) => (state.products=(product))
}
export default{
    state,
    actions,
    mutations
}