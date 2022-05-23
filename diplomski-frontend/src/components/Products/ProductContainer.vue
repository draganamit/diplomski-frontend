<template>
  <div class="content-products">
    <ProductBase
      v-for="n in 20"
      :key="n"
      @open="openWindowUpdate()"
    ></ProductBase>
  </div>
</template>

<script>
import ProductBase from "@/components/Products/ProductBase.vue";
export default {
  components: {
    ProductBase,
  },
  methods: {
    openWindowUpdate() {
      this.$emit("openUpdate");
    },
  },
};
</script>
<style scoped>
.content-products {
  border: 1px solid grey;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: grid;
  gap: 3rem 3rem;
  grid-template-columns: repeat(4, 1fr);
  background-color: blanchedalmond;
}
@media (max-width: 1100px) {
  .content-products {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .content-products {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .content-products {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
