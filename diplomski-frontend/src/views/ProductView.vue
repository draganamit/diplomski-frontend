<template>
  <div class="container-product">
    <div v-if="update" class="update-product">
      <UpdateProduct
        @closed="closeWindow()"
        :textButton="idProduct ? 'Sačuvaj izmjene' : 'Dodaj proizvod'"
      ></UpdateProduct>
    </div>
    <div class="add">
      <div>Proizvodi</div>
      <div class="button-add">
        <button @click="openUpdateProduct()">Dodaj proizvod</button>
      </div>
    </div>
    <div class="show-products">
      <ProductContainer @openUpdate="openUpdateProduct"></ProductContainer>
    </div>
    <div v-if="update" class="mask" @click.self="closeWindow()"></div>
  </div>
</template>

<script>
import ProductContainer from "@/components/Products/ProductContainer.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
export default {
  name: "ProductView",
  components: { ProductContainer, UpdateProduct },

  data() {
    return {
      update: false,
      idProduct: null,
    };
  },
  methods: {
    openUpdateProduct(id = null) {
      this.idProduct = id;
      this.update = true;
    },
    closeWindow() {
      this.update = false;
    },
  },
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
.update-product {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 50%;
  margin: auto;
  z-index: 2;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
