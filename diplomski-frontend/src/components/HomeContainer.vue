<template>
  <div class="main">
    <FiltersContainer></FiltersContainer>
    <HomeProductsContainer></HomeProductsContainer>
  </div>
</template>

<script>
import FiltersContainer from "./Filters/FiltersContainer.vue";
import HomeProductsContainer from "./Products/HomeProductContainer.vue";
export default {
  components: { FiltersContainer, HomeProductsContainer },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  padding: 0.5rem;
}
</style>
