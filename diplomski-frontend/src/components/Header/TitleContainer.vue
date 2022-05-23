<template>
  <div style="height: 4.5rem; display: flex; align-items: center">
    <div class="title_line">
      <div class="title" @click="$router.push('/')">Naslov</div>
      <div class="buttons" v-if="!prijaviSe">
        <button class="btnPrijava" @click="loginOpen()">Prijavi se</button>
        <button class="btnRegistracija" @click="registrationOpen()">
          Registruj se
        </button>
      </div>
      <div style="display: flex; margin-left: auto" v-if="prijaviSe">
        <UserName></UserName>
      </div>
    </div>
    <div class="prijava top-1" v-if="log">
      <div class="cls">
        <div @click="closeWindowLogin()">X</div>
      </div>
      <div class="container">
        <div class="label">
          <label>Email:</label>
        </div>
        <div class="input">
          <input type="text" v-model="model.username" />
        </div>
        <div class="label">
          <label>Lozinka:</label>
        </div>
        <div class="input">
          <input
            style="padding-right: 2rem"
            :type="showPassword ? 'text' : 'password'"
            v-model="model.password"
          />
          <i
            class="eye-off"
            @click="showPassword = !showPassword"
            :class="showPassword ? 'icon-eye' : 'icon-eye-off'"
          ></i>
        </div>
        <div v-if="errorLogin" class="error">Pogrešan email ili lozinka.</div>
        <div class="btnPrijaviSe">
          <button @click="Login()">Prijavi se</button>
        </div>
      </div>
    </div>
    <div class="prijava top-1" v-if="registration">
      <div class="cls">
        <div @click="closeWindowRegistration()">X</div>
      </div>
      <div class="container">
        <div class="label">
          <label>Ime:</label>
        </div>
        <div class="input">
          <input type="text" v-model="name" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="label">
          <label>Prezime:</label>
        </div>
        <div class="input">
          <input type="password" v-model="surname" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="label">
          <label>Lokacija:</label>
        </div>
        <div class="input">
          <input type="password" v-model="location" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="label">
          <label>Email:</label>
        </div>
        <div class="input">
          <input type="password" v-model="model.username" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="label">
          <label>Lozinka:</label>
        </div>
        <div class="input">
          <input type="password" v-model="model.password" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="label">
          <label>Potvrdi lozinku:</label>
        </div>
        <div class="input">
          <input type="password" v-model="confirmPasswordd" />
        </div>
        <div v-if="errorRegister" class="error">Polje mora biti popunjeno.</div>
        <div class="btnPrijaviSe">
          <button>Registruj se</button>
        </div>
      </div>
    </div>
    <div v-if="registration || log" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import UserName from "./UserName.vue";
export default {
  name: "TitleView",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      name: "",
      surname: "",
      location: "",
      confirmPasswordd: "",
      log: false,
      registration: false,
      errorLogin: true,
      errorRegister: true,
      prijaviSe: false,
      showPassword: false,
    };
  },
  methods: {
    loginOpen() {
      this.log = true;
    },
    closeWindowLogin() {
      this.log = false;
    },
    registrationOpen() {
      this.registration = true;
    },
    closeWindowRegistration() {
      this.registration = false;
    },
    away() {
      this.registration = false;
      this.log = false;
    },
    Login() {
      this.prijaviSe = true;
      this.log = false;
    },
  },
  components: { UserName },
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
}
.cls {
  display: flex;
  justify-content: end;
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
