<template>
<div>

  <div class="filters">
        <CategoryContainer></CategoryContainer>
        <PriceContainer></PriceContainer>
        <LocationContainer></LocationContainer>
  </div>
</div>

</template>

<script>
import CategoryContainer from "./CategoryContainer.vue";
import PriceContainer from "./PriceContainer.vue";
import LocationContainer from "./LocationContainer.vue";
export default {
    components: { CategoryContainer, PriceContainer, LocationContainer }
}
</script>

<style scoped>
.filters
{
    display: flex;
    flex-direction: column;
    width: 25rem;
    border: 1px solid grey;
    padding: 0.5rem;
    background-color: blanchedalmond;
}

</style>