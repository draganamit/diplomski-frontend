<template>
  <div>
    <div class="cls">
      <div @click="closeWindow()">X</div>
    </div>
    <div class="update">
      <div class="form-container">
        <ValidationObserver ref="observer">
          <form>
            <div>
              <ValidationProvider
                class="validation-provider"
                name="oldPassword"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="text-div">
                  <span> Trenutna lozinka: </span>
                  <input
                    name="oldPassword"
                    type="text"
                    v-model="model.oldPassword"
                  />
                </div>
                <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                <span v-if="incorrectPassword" class="error">
                  Pogrešna lozinka</span
                >
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider
                class="validation-provider"
                vid="password"
                name="password"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="text-div">
                  <span> Nova lozinka: </span>

                  <input
                    type="text"
                    v-model="model.newPassword"
                    name="password"
                  />
                </div>
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider
                class="validation-provider"
                name="comfirmPassword"
                rules="required|confirmed:password"
                v-slot="{ errors }"
              >
                <div class="text-div">
                  <span> Potvrdite lozinku: </span>
                  <input
                    name="comfirmPassword"
                    type="text"
                    v-model="confirmPassword"
                  />
                </div>

                <span v-if="errors.length" class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <button type="button" @click="update()" style="width: 100%">
              Sačuvaj izmjene
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      model: {
        oldPassword: "",
        newPassword: "",
      },
      confirmPassword: "",
      incorrectPassword: false,
    };
  },
  methods: {
    ...mapActions(["updatePassword"]),
    closeWindow() {
      this.$emit("closed");
    },
    async update() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      const response = await this.updatePassword(this.model);
      if (!response) {
        this.incorrectPassword = true;
        return;
      }

      this.$emit("save");
    },
  },
};
</script>

<style scoped>
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

form > div {
  display: flex;
  padding: 1rem 2rem;
  font-size: 1.2rem;
}
.update {
  padding-top: 2rem;
}
.text-div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
}
.text-div > span {
  width: 20rem;
}
.validation-provider {
  display: flex;
  flex-direction: column;
  width: 100%;
}
input {
  width: 100%;
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}
button {
  background-color: rgb(19 187 35);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.error {
  margin: auto;
  padding: 0.2rem;
  text-align: left;
  color: red;
  background: transparent;
}
</style>
