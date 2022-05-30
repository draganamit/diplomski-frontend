<template>
  <div style="height: 4.5rem; display: flex; align-items: center">
    <div class="title_line">
      <div class="title" @click="goToHome()">Naslov</div>
      <div class="buttons" v-if="!user">
        <button class="btnPrijava" @click="loginOpen()">Prijavi se</button>
        <button class="btnRegistracija" @click="registrationOpen()">
          Registruj se
        </button>
      </div>
      <div style="display: flex; margin-left: auto" v-if="user">
        <UserName @logout="LogOut()"></UserName>
      </div>
    </div>
    <LoginUser v-if="log" @close="closeWindowLogin()"></LoginUser>
    <RegistrationUser
      v-if="registration"
      @close="closeWindowRegistration()"
    ></RegistrationUser>

    <div v-if="registration || log" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

import UserName from "./UserName.vue";
import RegistrationUser from "@/components/RegistrationUser.vue";
import LoginUser from "@/components/LoginUser.vue";

export default {
  name: "TitleView",
  components: { UserName, RegistrationUser, LoginUser },

  data() {
    return {
      log: false,
      registration: false,
      showError: false,
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token) return;

    await this.getUserByUser();
  },

  methods: {
    ...mapActions(["registerUser", "loginUser", "getUserByUser"]),
    ...mapMutations(["setAuthAxiosHeader", "setUser", "setSearchModel"]),

    loginOpen() {
      this.log = true;
    },
    closeWindowLogin() {
      this.log = false;
      this.modelLogin = {
        email: "",
        password: "",
      };
    },
    registrationOpen() {
      this.registration = true;
    },
    closeWindowRegistration() {
      this.registration = false;
      this.modelRegistration = {
        name: "",
        surname: "",
        location: "",
        email: "",
        password: "",
      };
    },
    away() {
      this.registration = false;
      this.log = false;
      this.modelRegistration = {
        name: "",
        surname: "",
        location: "",
        email: "",
        password: "",
      };
    },
    LogOut() {
      localStorage.removeItem("token");
      this.setUser(null);
      this.setAuthAxiosHeader("setAuthAxiosHeader", null);
    },
    async goToHome() {
      this.$router.push("/");
      this.setSearchModel({
        paageNum: 1,
        pageSize: 8,
        categoryId: null,
      });
      await this.GetProductsForIndex(this.searchModel);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      searchModel: (state) => state.products.searchModel,
    }),
  },
};
</script>

<style scoped>
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
.prijava {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 20%;
  margin: auto;
  z-index: 2;
}
@media (max-width: 1024px) {
  .prijava {
    width: 80%;
  }
}
.top-1 {
  top: 1rem;
}

.title_line {
  display: flex;
  padding: 1rem 10rem;
  font-size: 1.5rem;
  background-color: blanchedalmond;
  align-items: center;
  width: 100%;
}
.buttons {
  margin-left: auto;
  display: flex;
  padding: 0.5rem;
}
.btnPrijava {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 8rem;
}
.btnRegistracija {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 8rem;
}

.container {
  margin-bottom: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
}
.label {
  text-align: left;
  padding: 0.4rem;
  padding-left: 0;
  margin-top: 1rem;
}
.input {
  text-align: left;
  position: relative;
}
input {
  width: 100%;
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
}
.btnPrijaviSe {
  text-align: right;
  margin: auto 0.5rem 0.5rem auto;
}
.btnPrijaviSe > button {
  padding: 0.5rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
  margin-top: 0.5rem;
}
.cls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cls > div {
  color: white;
  border: 1px solid white;
  background: red;
  cursor: pointer;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  padding: 0.3rem 0;
}
.error {
  margin: auto;
  padding: 0.2rem;
  text-align: left;
  color: red;
  background: transparent;
}
.eye-off {
  position: absolute;
  right: 0.5rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
</style>
