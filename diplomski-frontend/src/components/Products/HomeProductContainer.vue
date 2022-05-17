<template>
  <div class="container">
    <div class="content">
      <SearchContainer></SearchContainer>

      <ProductContainer></ProductContainer>
    </div>
  </div>
</template>

<script>
import SearchContainer from "../SearchContainer.vue";
import ProductContainer from "./ProductContainer.vue";
export default {
  components: { SearchContainer, ProductContainer },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  padding: 0.5rem;
  background-color: blanchedalmond;
  width: 100%;
  margin-right: 1rem;
  margin-left: 0.5rem;
}
.content {
  width: 100%;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
}
/* .content-product { 
  border: 1px solid grey;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: grid;
  gap: 3rem 3rem;
  grid-template-columns: repeat(4, 1fr);
}
*/
</style>
