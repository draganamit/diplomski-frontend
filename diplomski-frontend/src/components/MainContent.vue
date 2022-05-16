<template>
  <div class="main">
      <FiltersContainer></FiltersContainer>
      <SearchProductsContainer></SearchProductsContainer>
  </div>
</template>

<script>
import FiltersContainer from "./FiltersContainer.vue";
import SearchProductsContainer from "./SearchProductsContainer.vue";
export default {
    components: { FiltersContainer, SearchProductsContainer }
}
</script>

<style scoped>
.main
{
  display: flex;
  width: 100%;
  padding: 0.5rem;
}
</style>