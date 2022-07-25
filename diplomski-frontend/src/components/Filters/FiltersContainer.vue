<template>
  <div>
    <div class="filters">
      <CategoryContainer
        v-model="model"
        @search="$emit('search')"
      ></CategoryContainer>
      <PriceContainer
        v-model="model"
        @search="$emit('search')"
      ></PriceContainer>
      <LocationContainer
        v-model="model"
        @search="$emit('search')"
      ></LocationContainer>
    </div>
  </div>
</template>

<script>
import CategoryContainer from "./CategoryContainer.vue";
import PriceContainer from "./PriceContainer.vue";
import LocationContainer from "./LocationContainer.vue";
export default {
  components: { CategoryContainer, PriceContainer, LocationContainer },

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
.filters {
  display: flex;
  flex-direction: column;
  width: 25rem;
  /* border: 1px solid grey; */
  /* padding: 0.5rem; */
  background-color: blanchedalmond;
}
</style>
