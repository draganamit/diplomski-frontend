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
      :textQuestion="'Da li ste sugurni da želite da deaktivirate nalog?'"
    ></DeleteModal>
    <div class="user-imformation">
      <div class="user-div">
        <div v-if="userById" style="padding: 1rem; font-size: 2rem">
          {{ fullName }}
        </div>
        <div v-if="userById" style="padding: 1rem; font-size: 1.5rem">
          {{ userById.email }}
        </div>
        <div v-if="userById" style="padding: 1rem; font-size: 1.5rem">
          {{ userById.location }}
        </div>
        <button style="width: 100%" @click="openUpdate()">
          Azuriraj lične podatke
        </button>
        <button
          style="width: 100%; background-color: rgb(183 28 11)"
          @click="openUpdatePassword()"
        >
          Promijeni lozinku
        </button>
        <button
          style="width: 100%; background-color: #a29999"
          @click="deleteUser()"
        >
          Deaktiviraj profil
        </button>
      </div>
    </div>

    <div class="proizvodi-title">
      <div>Proizvodi</div>
    </div>
    <div class="show-products">
      <ProductContainer></ProductContainer>
    </div>

    <div
      v-if="update || updatePassword || deactivate"
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

import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    ProductContainer,
    UpdateUser,
    UpdatePassword,
    DeleteModal,
  },

  data() {
    return {
      update: false,
      updatePassword: false,
      deactivate: false,
    };
  },
  methods: {
    ...mapActions(["getUserById", "blockUser"]),
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
    },
    async save() {
      this.update = false;
      await this.getUserById(Number(this.$route.query.userId));
    },
    savePassword() {
      this.updatePassword = false;
    },
    deleteUser() {
      this.deactivate = true;
    },
    async confirmRemove() {
      await this.blockUser(Number(this.$route.query.userId));
      localStorage.removeItem("token");
      this.setUser(null);
      this.setAuthAxiosHeader("setAuthAxiosHeader", null);
      window.location = "/";
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

      fullName(state) {
        return state.users.userById.name + " " + state.users.userById.surname;
      },
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
.user-imformation {
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
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
</style>
