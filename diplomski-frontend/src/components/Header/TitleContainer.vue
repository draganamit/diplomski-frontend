<template>
  <div style="display: flex; align-items: center">
    <div class="title_line">
      <div class="title" @click="goToHome()" style="cursor: pointer">
        <img src="@/assets/dplogo1.png" alt="" />
      </div>
      <h1
        style="
          font-size: 2.3rem;
          font-weight: bold;
          font-style: italic;
          font-family: cursive;
          color: rgb(170, 52, 9);
          text-shadow: 1px 1px 1px #e65b28;
          letter-spacing: 1.77mm;
          margin: 0 auto;
        "
      >
        {{ Title }}
      </h1>
      <div class="buttons" v-if="!user">
        <button class="btnPrijava" @click="loginOpen()">Prijavi se</button>
        <button class="btnRegistracija" @click="registrationOpen()">
          Registruj se
        </button>
      </div>
      <div style="display: flex" v-if="user">
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
      window.location = "/";
    },
    async goToHome() {
      window.location = "/";
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      userById: (state) => state.users.userById,
      searchModel: (state) => state.products.searchModel,
    }),
    Title() {
      switch (this.$route.name) {
        case "home":
          return " ";
        case "users":
          return "Korisnici";
        case "category":
          return "Kategorije";
        case "report":
          return "Izvještaj";
        case "productdescription":
          return "Detalji proizvoda";
        case "orderproduct":
          return "Narudžbe";
        case "product":
          return "Proizvodi";
        case "userprofile":
          if (this.user && this.userById) {
            if (this.user.id == this.userById.id) {
              return "Vaš nalog";
            } else {
              return `Nalog: ${this.userById.name} ${this.userById.surname}`;
            }
          } else return "";
        default:
          return "";
      }
    },
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
  z-index: 1;
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
  padding: 0.5rem 10rem;
  font-size: 1.5rem;
  background-color: blanchedalmond;
  align-items: center;
  width: 100%;
  box-shadow: 5px 6px 5px 0px rgb(0 0 0 / 75%);
  -webkit-box-shadow: 1px 1px 5px 0px rgb(0 0 0 / 20%);
  -moz-box-shadow: 5px 6px 5px 0px rgba(0, 0, 0, 0.75);
}
.buttons {
  margin-left: auto;
  display: flex;
  padding: 0.5rem;
}
.btnPrijava {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: none;
  /* padding: 0.5rem 1rem; */
  margin-right: 0.5rem;
  font-size: 1.1rem;
  width: 8rem;
  cursor: pointer;
  padding: 0.5rem;
  font-family: cursive;
  /* font-size: 1.2rem; */

  font-weight: bold;
  font-style: italic;
  border-radius: 5px;
}
.btnRegistracija {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: none;
  /* padding: 0.5rem 1rem; */
  font-size: 1.1rem;
  width: 8rem;
  cursor: pointer;
  padding: 0.5rem;
  font-family: cursive;
  /* font-size: 1.2rem; */

  font-weight: bold;
  font-style: italic;
  border-radius: 5px;
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
  cursor: pointer;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
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
