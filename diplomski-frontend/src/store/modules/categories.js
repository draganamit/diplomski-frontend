const state = {
    categories: []
}

const actions = {
    async getAllCategories({rootState, commit})
    {
        const response = await rootState.baseAxios.get("category/getall");
        commit('setCategories', response.data.data);
    }

}

const mutations = {
    setCategories: (state,categories) => (state.categories=categories)

}

export default{
    state,
    actions,
    mutations
}