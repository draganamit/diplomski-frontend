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
          <input type="text" v-model="modelLogin.username" />
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
          <button @click="Login()">Prijavi se</button>
        </div>
      </div>
    </div>
    <ValidationObserver ref="observer">
      <div class="prijava top-1" v-if="registration">
        <div class="cls">
          <div @click="closeWindowRegistration()">X</div>
        </div>
        <div class="container">
          <div class="label">
            <label>Ime:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="name"
              rules="required"
              v-slot="{ errors }"
            >
              <input name="name" type="text" v-model="modelRegistration.name" />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div class="label">
            <label>Prezime:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="surname"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="surname"
                type="text"
                v-model="modelRegistration.surname"
              />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div class="label">
            <label>Lokacija:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="location"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="location"
                type="text"
                v-model="modelRegistration.location"
              />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div class="label">
            <label>Email:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="email"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="email"
                type="text"
                v-model="modelRegistration.email"
              />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div class="label">
            <label>Lozinka:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="password"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="password"
                type="password"
                v-model="modelRegistration.password"
              />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div class="label">
            <label>Potvrdi lozinku:</label>
          </div>
          <div class="input">
            <ValidationProvider
              name="comfirmPassword"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                name="comfirmPassword"
                type="password"
                v-model="confirmPassword"
              />
              <span v-if="errors.length" class="error">greska</span>
            </ValidationProvider>
          </div>
          <div v-if="errorConfirm" class="error">
            Password i ConfirmPassword nisu jednaki!
          </div>
          <div class="btnPrijaviSe">
            <button @click="registrationUser()">Registruj se</button>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <div v-if="registration || log" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required",
});
import UserName from "./UserName.vue";
export default {
  name: "TitleView",
  components: { UserName, ValidationProvider, ValidationObserver },

  data() {
    return {
      modelLogin: {
        username: "",
        password: "",
      },
      modelRegistration: {
        name: "",
        surname: "",
        location: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      log: false,
      registration: false,
      errorLogin: false,
      errorRegister: false,
      errorConfirm: false,
      prijaviSe: false,
      showPassword: false,

      errorRegisterConfirmPassword: false,
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
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
    Login() {
      this.prijaviSe = true;
      this.log = false;
    },

    async registrationUser() {
      const validateResult = await this.$refs.observer.validate();
      console.log("validateResult", validateResult);

      if (this.modelRegistration.password == this.confirmPassword) {
        try {
          await this.registerUser(this.modelRegistration);
          this.registration = false;
          this.modelRegistration = {
            name: "",
            surname: "",
            location: "",
            email: "",
            password: "",
          };
        } catch (error) {
          console.log("error:", error);
        }
      } else {
        this.errorConfirm = true;
      }
    },
  },
  watch: {
    modelRegistration: {
      deep: true,
      handler() {
        this.errorRegisterConfirmPassword = false;
      },
    },
    confirmPassword() {
      this.errorRegisterConfirmPassword = false;
    },
  },
  beforeDestroy() {
    this.modelRegistration = {
      name: "",
      surname: "",
      location: "",
      email: "",
      password: "",
    };
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
