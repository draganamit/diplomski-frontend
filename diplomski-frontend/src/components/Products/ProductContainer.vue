<template>
  <div class="content-products">
    <ProductBase v-for="n in 20" :key="n"></ProductBase>
  </div>
</template>

<script>
import ProductBase from "@/components/Products/ProductBase.vue";
export default {
  components: {
    ProductBase,
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
</style>
