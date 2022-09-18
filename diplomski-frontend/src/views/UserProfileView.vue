<template>
  <div>
    <div v-if="update || updatePassword" class="update-form">
      <UpdateUser @save="save()" v-if="update" @closed="away()"></UpdateUser>
      <UpdatePassword
        @save="savePassword()"
        v-if="updatePassword"
        @closed="away()"
      ></UpdatePassword>
    </div>
    <DeleteModal
      v-if="deactivate"
      @close="away()"
      @remove="confirmRemove()"
      :textQuestion="
        userById.isDeleted
          ? 'Da li ste sugurni da želite da aktivirate nalog?'
          : 'Da li ste sugurni da želite da deaktivirate nalog?'
      "
    ></DeleteModal>

    <DeleteModal
      v-if="remove"
      @close="closeWindow()"
      @remove="removeProduct()"
      :textQuestion="'Da li ste sugurni da želite da obrišete proizvod?'"
    ></DeleteModal>
    <div class="user-information">
      <div class="user-div">
        <div
          v-if="userById"
          style="
            padding: 1rem;
            font-size: 2rem;
            font-weight: bold;
            font-style: italic;
            font-family: cursive;
            color: #aa3409;
          "
        >
          {{ fullName }}
        </div>
        <div style="margin-left: 7rem">
          <div
            v-if="userById"
            style="
              padding: 1rem;
              font-size: 1.5rem;
              color: #e65b28;
              font-family: cursive;
              padding-bottom: 0.5rem;
              text-align: start;
            "
          >
            <i class="icon-envelope"></i>
            {{ userById.email }}
          </div>
          <div
            v-if="userById"
            style="
              padding: 1rem;
              font-size: 1.5rem;
              color: #e65b28;
              font-family: cursive;
              padding-top: 0.5rem;
              text-align: start;
            "
          >
            <i class="icon-location"></i>

            {{ userById.location }}
          </div>
        </div>
        <button
          v-if="user.type == 0 || user.id == userById.id"
          class="button-update-user"
          @click="openUpdate()"
        >
          Azuriraj lične podatke
        </button>
        <button
          v-if="user.type == 0 || user.id == userById.id"
          class="button-update-password"
          @click="openUpdatePassword()"
        >
          Promijeni lozinku
        </button>
        <button
          v-if="user.type == 0 || user.id == userById.id"
          :class="userById.isDeleted ? 'button-activate' : 'button-deactivate'"
          @click="deleteUser()"
        >
          {{ userById.isDeleted ? "Aktiviraj nalog" : "Deaktiviraj nalog" }}
        </button>
      </div>
    </div>

    <div class="proizvodi-title">
      <div>Proizvodi:</div>
    </div>
    <div class="show-products">
      <ProductContainer
        @openUpdate="openUpdateProduct"
        @openRemove="openRemoveProduct"
      ></ProductContainer>
    </div>

    <div v-if="updateProduct" class="update-product" style="height: 80%">
      <UpdateProduct
        @closed="closeWindow()"
        @save="closeGetProduct()"
        :textButton="idProduct ? 'Sačuvaj izmjene' : 'Dodaj proizvod'"
        :idProduct="idProduct"
      ></UpdateProduct>
    </div>
    <div
      v-if="update || updatePassword || deactivate || updateProduct || remove"
      class="mask"
      @click.self="away()"
    ></div>
  </div>
</template>

<script>
import ProductContainer from "@/components/Products/ProductContainer.vue";
import UpdateUser from "@/components/UpdateUser.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";

import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    ProductContainer,
    UpdateUser,
    UpdatePassword,
    DeleteModal,
    UpdateProduct,
  },

  data() {
    return {
      update: false,
      updatePassword: false,
      deactivate: false,
      remove: false,
      id: null, //id Producta za brisanje
      updateProduct: false,
      idProduct: null,
    };
  },
  methods: {
    ...mapActions([
      "getUserById",
      "blockUser",
      "deleteProduct",
      "GetProductsForIndex",
      "getUserByUser",
    ]),
    ...mapMutations(["setAuthAxiosHeader", "setUser", "setSearchModel"]),

    openUpdate() {
      this.update = true;
    },
    openUpdatePassword() {
      this.updatePassword = true;
    },
    away() {
      this.update = false;
      this.updatePassword = false;
      this.deactivate = false;
      this.remove = false;
      this.updateProduct = false;
    },
    async save() {
      this.update = false;
      await this.getUserById(Number(this.$route.query.userId));
      await this.getUserByUser();
    },
    savePassword() {
      this.updatePassword = false;
    },
    deleteUser() {
      this.deactivate = true;
    },
    async confirmRemove() {
      await this.blockUser(Number(this.$route.query.userId));
      if (this.user.id == Number(this.$route.query.userId)) {
        localStorage.removeItem("token");
        this.setUser(null);
        this.setAuthAxiosHeader("setAuthAxiosHeader", null);
        window.location = "/";
      }
      this.deactivate = false;
      await this.getUserById(Number(this.$route.query.userId));
    },
    closeWindow() {
      this.updateProduct = false;
      this.remove = false;
    },
    async removeProduct() {
      await this.deleteProduct(this.id);
      this.remove = false;
      await this.GetProductsForIndex(this.searchModel);
    },
    openRemoveProduct(id) {
      this.id = id;
      this.remove = true;
    },
    async closeGetProduct() {
      this.updateProduct = false;
      await this.GetProductsForIndex(this.searchModel);
    },
    openUpdateProduct(productId = null) {
      this.idProduct = productId;
      this.updateProduct = true;
    },
  },
  async created() {
    await this.getUserById(Number(this.$route.query.userId));
  },
  watch: {
    "$route.query.userId"(newVal) {
      this.getUserById(newVal);
    },
  },
  computed: {
    ...mapState({
      userById: (state) => state.users.userById,
      searchModel: (state) => state.products.searchModel,
      fullName(state) {
        return state.users.userById.name + " " + state.users.userById.surname;
      },
      user: (state) => state.users.user,
    }),
  },
};
</script>

<style scoped>
.btn-update-password {
  display: flex;
  justify-content: flex-end;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 1rem 1rem;
  margin-bottom: 0.2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
}
.user-information {
  display: flex;
  justify-content: flex-start;
  padding: 3rem 3rem;
}
.user-div {
  width: 30rem;
  border-radius: 0.5rem;
  background-color: blanchedalmond;
}
.proizvodi-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  font-weight: bold;
  font-style: italic;
  font-family: cursive;
  color: rgb(170, 52, 9);
  margin-left: 2rem;
}
.show-products {
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
}
.update-form {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;

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
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
.button-update-user {
  width: 100%;
  cursor: pointer;
  background: #d19b26;
  font-weight: bold;
}
.button-update-user:hover {
  background: #b6861f;
}
.button-update-password {
  width: 100%;
  cursor: pointer;
  background-color: rgb(230, 91, 40);
  font-weight: bold;
}
.button-update-password:hover {
  background-color: rgb(204 79 33);
}
.button-deactivate {
  width: 100%;
  background-color: rgb(135 132 132);
  cursor: pointer;
  background: red;
  font-weight: bold;
}
.button-deactivate:hover {
  background: #db0202;
}
.button-activate {
  width: 100%;
  background-color: rgb(135 132 132);
  cursor: pointer;
  background: rgb(8, 196, 33);
  font-weight: bold;
}
.button-activate:hover {
  background: #04a817;
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
}
</style>
