<template>
  <div class="container">
    <div class="header">Kategorije</div>
    <div @click="dajSveProizvode" style="padding: 0.5rem">Svi proizvodi</div>
    <div
      v-for="(category, key) in categories"
      :key="key"
      style="padding: 0.5rem"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      IdCategory: null,
    };
  },
  async created() {
    this.IdCategory = this.$route.query.cateogory;

    await this.getAllCategories();
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  methods: {
    ...mapActions(["getAllCategories"]),
    ...mapMutations(["setCategories"]),
    dajSveProizvode() {
      this.IdCategory = "prosledjeni id";
      this.$router.push({
        query: {
          nazivGore: this.IdCategory,
        },
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
