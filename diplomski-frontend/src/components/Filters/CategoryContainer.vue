<template>
  <div class="container">
    <div class="header">Kategorije</div>
    <div @click="getProductByCategory(null)" style="padding: 0.5rem">
      Svi proizvodi
    </div>
    <div
      v-for="(category, key) in categories"
      :key="key"
      style="padding: 0.5rem"
      @click="getProductByCategory(category.id)"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  async created() {
    await this.getAllCategories();
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  methods: {
    ...mapActions(["getAllCategories"]),

    getProductByCategory(id) {
      let query = Object.assign({}, this.$route.query);
      query.categoryId = id;
      this.$router.push({
        query: query,
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  margin: 0.5rem 0;
}
.header {
  background-color: rgb(230, 91, 40);
  color: white;
  padding: 0.5rem;
}
</style>
