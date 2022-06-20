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
        userId:null,
    },
    totalCount: null
}
const actions = {
    async GetProductsForIndex({rootState, commit}, searchModel)
    {
        const response = await rootState.baseAxios.post(`ProductContorller/GetProductsForIndex`, searchModel);
       
        commit("setProducts", response.data.data)
        commit("setTotalCount", response.data.totalCount)
        
    },
    async addProduct({rootState},newProduct)
    {
         await rootState.authAxios.post("ProductContorller", newProduct);
        // commit("setNewProduct", response.data.data);
    },
    async updateProduct({rootState},updatedProduct)
    {
        await rootState.authAxios.put("ProductContorller", updatedProduct);
        
    },
    async deleteProduct({rootState},id)
    {
        await rootState.authAxios.delete("ProductContorller/"+id);
        
    },
    async getProductById({rootState},id)
    {
       const  response = await rootState.authAxios.get("ProductContorller/"+id);
       return response.data.data;
        
    }
  
}
const mutations = {
    setProducts:(state,products) => (state.products=products),
    setSearchModel:(state, model)=> {
        state.searchModel = model;
    },
    setTotalCount: (state,totalCount) => (state.totalCount=totalCount)
}
export default{
    state,
    actions,
    mutations
}