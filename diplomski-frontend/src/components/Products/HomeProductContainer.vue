<template>
  <div class="container">
    <div class="content">
      <SearchContainer
        v-model="model"
        @search="$emit('search')"
      ></SearchContainer>

      <ProductContainer></ProductContainer>
    </div>
  </div>
</template>

<script>
import SearchContainer from "../SearchContainer.vue";
import ProductContainer from "./ProductContainer.vue";
export default {
  components: { SearchContainer, ProductContainer },

  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-right: 1rem;
  margin-left: 0.5rem;

  padding: 0;

  background: transparent;
}
.content {
  width: 100%;
  /* border: 1px solid grey; */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
