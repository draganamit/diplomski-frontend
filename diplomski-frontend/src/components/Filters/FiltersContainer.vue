<template>
  <div>
    <div class="filters" :class="showMenu ? 'absolute-menu' : ''">
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
import { mapState } from "vuex";

export default {
  components: { CategoryContainer, PriceContainer, LocationContainer },

  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      showMenu: (state) => state.showMenu,
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
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  width: 25rem;
  background-color: blanchedalmond;
}
@media (max-width: 1024px) {
  .filters {
    display: none;
  }
}
.absolute-menu {
  position: absolute;
  top: 4rem;
  display: block;
  z-index: 10;
}
</style>
