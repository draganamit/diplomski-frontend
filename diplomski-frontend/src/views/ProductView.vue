<template>
  <div class="container-product">
    <div class="add">
      <div>Proizvodi</div>
      <div class="button-add">
        <button>Dodaj proizvod</button>
      </div>
    </div>
    <div class="show-products">
      <ProductContainer></ProductContainer>
    </div>
  </div>
</template>

<script>
import ProductContainer from "@/components/Products/ProductContainer.vue";
export default {
  name: "ProductView",
  components: { ProductContainer },
};
</script>

<style scoped>
.container-product {
  display: flex;
  padding: 2rem 10rem;
  flex-direction: column;
}
.add {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.show-products {
  width: 100%;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
}
.button-add {
  display: flex;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
</style>
