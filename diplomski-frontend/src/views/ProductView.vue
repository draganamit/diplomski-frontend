<template>
  <div class="container-product">
    <DeleteModal
      v-if="remove"
      @close="closeWindow()"
      @remove="removeProduct()"
      :textQuestion="'Da li ste sugurni da želite da obrišete proizvod?'"
    ></DeleteModal>
    <div
      v-if="update"
      class="update-product"
      style="overflow: scroll; height: 80%; overflow-x: hidden"
    >
      <UpdateProduct
        @closed="closeWindow()"
        @save="closeGetProduct()"
        :textButton="idProduct ? 'Sačuvaj izmjene' : 'Dodaj proizvod'"
        :idProduct="idProduct"
      ></UpdateProduct>
    </div>
    <div class="add">
      <div>Proizvodi</div>
      <div class="button-add">
        <button @click="openUpdateProduct()">Dodaj proizvod</button>
      </div>
    </div>
    <div class="show-products">
      <ProductContainer
        @openUpdate="openUpdateProduct"
        @openRemove="openRemoveProduct"
      ></ProductContainer>
    </div>
    <div v-if="update || remove" class="mask" @click.self="closeWindow()"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProductContainer from "@/components/Products/ProductContainer.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "ProductView",
  components: { ProductContainer, UpdateProduct, DeleteModal },

  data() {
    return {
      update: false,
      idProduct: null,
      id: null, //id Producta za brisanje
      remove: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      searchModel: (state) => state.products.searchModel,
    }),
  },
  methods: {
    ...mapActions(["GetProductsForIndex", "deleteProduct"]),
    openUpdateProduct(productId = null) {
      this.idProduct = productId;
      this.update = true;
    },
    openRemoveProduct(id) {
      this.id = id;
      this.remove = true;
    },
    closeWindow() {
      this.update = false;
      this.remove = false;
    },
    async closeGetProduct() {
      this.update = false;
      await this.GetProductsForIndex(this.searchModel);
    },
    async removeProduct() {
      await this.deleteProduct(this.id);
      this.remove = false;
      await this.GetProductsForIndex(this.searchModel);
    },
  },

  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          let query = Object.assign({}, this.$route.query);
          query.userId = newVal.id;
          this.$router
            .replace({
              query: query,
            })
            .catch();
        }
      },
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
  /* border: 1px solid grey; */
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
  cursor: pointer;
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
