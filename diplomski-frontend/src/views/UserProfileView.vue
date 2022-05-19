<template>
  <div>
    <div v-if="update || updatePassword" class="update-form">
      <UpdateUser v-if="update" @closed="away()"></UpdateUser>
      <UpdatePassword v-if="updatePassword" @closed="away()"></UpdatePassword>
    </div>
    <div class="user-imformation">
      <div class="user-div">
        <div style="padding: 1rem; font-size: 2rem">Admin Admin</div>
        <div style="padding: 1rem; font-size: 1.5rem">admin@gmail.com</div>
        <div style="padding: 1rem; font-size: 1.5rem">Lokacija</div>
        <button style="width: 100%" @click="openUpdate()">
          Azuriraj lične podatke
        </button>
        <button
          style="width: 100%; background-color: rgb(183 28 11)"
          @click="openUpdatePassword()"
        >
          Promijeni lozinku
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
      v-if="update || updatePassword"
      class="mask"
      @click.self="away()"
    ></div>
  </div>
</template>

<script>
import ProductContainer from "@/components/Products/ProductContainer.vue";
import UpdateUser from "@/components/UpdateUser.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";

export default {
  components: {
    ProductContainer,
    UpdateUser,
    UpdatePassword,
  },
  data() {
    return {
      update: false,
      updatePassword: false,
    };
  },
  methods: {
    openUpdate() {
      this.update = true;
    },
    openUpdatePassword() {
      this.updatePassword = true;
    },
    away() {
      this.update = false;
      this.updatePassword = false;
    },
  },
};
</script>

<style scoped>
.btn-update-password {
  display: flex;
  justify-content: end;
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
  justify-content: start;
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
  border-radius: 5px;
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
