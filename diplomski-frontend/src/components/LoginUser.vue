<template>
  <div class="prijava top-1">
    <div class="cls">
      <div @click="closeWindowLogin()">X</div>
    </div>
    <form @submit.prevent="login()" class="container">
      <div class="label">
        <label>Email:</label>
      </div>
      <div class="input">
        <input type="text" v-model="modelLogin.email" />
      </div>
      <div class="label">
        <label>Lozinka:</label>
      </div>
      <div class="input">
        <input
          style="padding-right: 2rem"
          :type="showPassword ? 'text' : 'password'"
          v-model="modelLogin.password"
        />
        <i
          class="eye-off"
          @click="showPassword = !showPassword"
          :class="showPassword ? 'icon-eye' : 'icon-eye-off'"
        ></i>
      </div>
      <div v-if="errorLogin" class="error">Pogrešan email ili lozinka.</div>
      <div class="btnPrijaviSe">
        <button>Prijavi se</button>
      </div>
      <a @click="openForgot()">Zaboravili ste lozinku?</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      modelLogin: {
        email: "",
        password: "",
      },
      errorLogin: false,
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["loginUser", "getUserByUser"]),

    closeWindowLogin() {
      this.$emit("close");
    },
    async login() {
      if (this.modelLogin.email != "" && this.modelLogin.password != "") {
        try {
          const response = await this.loginUser(this.modelLogin);
          localStorage.setItem("token", "Bearer " + response.data.data);

          this.modelLogin = {
            email: "",
            password: "",
          };
          this.closeWindowLogin();
          await this.getUserByUser();
          window.location = "/";
        } catch (error) {
          this.errorLogin = true;
        }
      } else {
        console.log("The username and password must be present");
      }
    },
    openForgot() {
      this.$router.push({ name: "forgotpassword" });
      this.closeWindowLogin();
    },
  },
};
</script>

<style scoped>
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
.top-1 {
  top: 1rem;
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
.cls > div:hover {
  background: #c40404;
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
  background-color: rgb(220 220 220);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
}
input:focus {
  box-shadow: 0 0 5px #b7b7b7;
  border-color: #b6aeae;
  border-top-color: #fbf6f6;
  border-left-color: #fbf6f6;
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
.btnPrijaviSe {
  text-align: right;
  margin: auto 0.5rem 0.5rem auto;
  font-size: 1rem;
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
.btnPrijaviSe > button:hover {
  background-color: rgb(193 73 28);
}
a {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-size: 0.9rem;
  color: #0a86ff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
