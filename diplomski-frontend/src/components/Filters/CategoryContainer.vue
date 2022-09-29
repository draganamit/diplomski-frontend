<template>
  <div class="container">
    <div class="header">
      <div style="width: 100%">Kategorije</div>
    </div>
    <div
      @click="getProductByCategory(null)"
      style="padding: 0.4rem"
      class="category"
      :class="{ selected: $route.query.categoryId == null }"
    >
      <div>Svi proizvodi</div>
    </div>
    <div
      v-for="(category, key) in categories"
      :key="key"
      style="padding: 0.4rem"
      class="category"
      :class="{ selected: category.id == $route.query.categoryId }"
      @click="getProductByCategory(category.id)"
    >
      <div>
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    await this.getAllCategories();
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    ...mapActions(["getAllCategories"]),

    getProductByCategory(id) {
      this.model.categoryId = id;
      this.$emit("search");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.header {
  background-color: rgb(230, 91, 40);
  color: white;
  padding: 0.5rem;
  font-weight: bold;
  font-style: italic;
  display: flex;
}
.category {
  cursor: pointer;
  transition: all 0.3s linear;
  font-family: cursive;
}
.category > div {
  cursor: pointer;
  transition: all 0.3s linear;
}
.category:hover > div {
  color: rgb(230, 91, 40);
  font-weight: bold;
}
.selected {
  background: rgb(231, 144, 90);
  color: white;
}
.close-menu {
  display: none;
  cursor: pointer;
}
@media (max-width: 1024px) {
  .close-menu {
    display: block;
  }
}
</style>
