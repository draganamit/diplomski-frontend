<template>
  <ValidationObserver ref="observer">
    <div class="prijava top-1">
      <div class="cls">
        <div @click="closeWindowRegistration()">X</div>
      </div>
      <form @submit.prevent="registrationUser()" class="container">
        <div class="label">
          <label>Ime:</label>
        </div>
        <div class="input">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <input name="name" type="text" v-model="modelRegistration.name" />
            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
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
            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
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
            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
        <div class="label">
          <label>Email:</label>
        </div>
        <div class="input">
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input name="email" type="text" v-model="modelRegistration.email" />
            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
        <div class="label">
          <label>Lozinka:</label>
        </div>
        <div class="input">
          <ValidationProvider
            vid="password"
            name="password"
            rules="required"
            v-slot="{ errors }"
          >
            <div style="position: relative">
              <input
                style="padding-right: 2rem"
                name="password"
                :type="showRegisterPassword ? 'text' : 'password'"
                v-model="modelRegistration.password"
              />
              <i
                class="eye-off"
                @click="showRegisterPassword = !showRegisterPassword"
                :class="showRegisterPassword ? 'icon-eye' : 'icon-eye-off'"
              ></i>
            </div>

            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
        <div class="label">
          <label>Potvrdi lozinku:</label>
        </div>
        <div class="input">
          <ValidationProvider
            name="comfirmPassword"
            rules="required|confirmed:password"
            v-slot="{ errors }"
          >
            <div style="position: relative">
              <input
                style="padding-right: 2rem"
                name="comfirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
              />
              <i
                class="eye-off"
                @click="showConfirmPassword = !showConfirmPassword"
                :class="showConfirmPassword ? 'icon-eye' : 'icon-eye-off'"
              ></i>
            </div>

            <span v-if="errors.length && showError" class="error">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
        <div class="btnPrijaviSe">
          <button>Registruj se</button>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      modelRegistration: {
        name: "",
        surname: "",
        location: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      showError: false,
      showRegisterPassword: false,
      showConfirmPassword: false,
      errorConfirm: false,
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    closeWindowRegistration() {
      this.$emit("close");
    },
    async registrationUser() {
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!valid) return;

      if (this.modelRegistration.password == this.confirmPassword) {
        try {
          await this.registerUser(this.modelRegistration);

          this.modelRegistration = {
            name: "",
            surname: "",
            location: "",
            email: "",
            password: "",
          };
          this.closeWindowRegistration();
        } catch (error) {
          console.log("error:", error);
        }
      } else {
        this.errorConfirm = true;
      }
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
</style>
