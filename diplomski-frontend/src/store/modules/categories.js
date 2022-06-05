const state = {
    categories: []
}

const actions = {
    async getAllCategories({rootState, commit})
    {
        const response = await rootState.baseAxios.get("category/getall");
        commit('setCategories', response.data.data);
    },
    async addCategory({rootState},model)
    {
        await rootState.baseAxios.post("category",model);
    },
    async getCategoryById({rootState},id)
    {
        const response = await rootState.baseAxios.get("category/"+id);
        return response.data.data;
    },
    async updateCategory({rootState},updatedCategory)
    {
        await rootState.baseAxios.put("category", updatedCategory);
    },
    async deleteCategory({rootState},id)
    {
        try {
        await rootState.baseAxios.delete("category/"+id);

            
        } catch (error) {
            console.log(error.response);
        }
    }

}

const mutations = {
    setCategories: (state,categories) => (state.categories=categories),
   

}

export default{
    state,
    actions,
    mutations
}