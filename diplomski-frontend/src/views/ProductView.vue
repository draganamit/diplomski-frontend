<template>
  <div class="container-product">
    <DeleteModal
      v-if="remove"
      @close="closeWindow()"
      @remove="removeProduct()"
      :textQuestion="'Da li ste sugurni da želite da obrišete proizvod?'"
    ></DeleteModal>

    <div class="add">
      <div class="button-add">
        <button @click="openUpdateProduct()">Dodaj proizvod</button>
      </div>
    </div>
    <!-- <div
      style="
        font-weight: bold;
        font-style: italic;
        font-family: cursive;
        color: rgb(170, 52, 9);
        font-size: 1.5rem;
        padding: 1rem;
        text-align: start;
        margin-left: 2rem;
      "
    >
      Proizvodi:
    </div> -->
    <div class="show-products">
      <ProductContainer
        @openUpdate="openUpdateProduct"
        @openRemove="openRemoveProduct"
      ></ProductContainer>
    </div>
    <div v-if="update || remove" class="mask" @click.self="closeWindow()">
      <div v-if="update" class="update-product" style="height: 80%">
        <UpdateProduct
          @closed="closeWindow()"
          @save="closeGetProduct()"
          :textButton="idProduct ? 'Sačuvaj izmjene' : 'Dodaj proizvod'"
          :idProduct="idProduct"
        ></UpdateProduct>
      </div>
    </div>
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
@media (max-width: 1536px) {
  .container-product {
    padding: 2rem 5rem;
  }
}
@media (max-width: 1280px) {
  .container-product {
    padding: 2rem 3rem;
  }
}
@media (max-width: 1024px) {
  .description-div {
    padding: 2rem 2rem;
  }
}

.add {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.show-products {
  width: 100%;
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
  border: none;
  padding: 1rem 0.5rem;
  margin-right: 0.5rem;
  width: 10rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: cursive;
  font-size: 1.1rem;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
.update-product {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  border-radius: 0.5rem;
  width: 50%;
  margin: auto;
  z-index: 2;
  min-width: 450px;
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
