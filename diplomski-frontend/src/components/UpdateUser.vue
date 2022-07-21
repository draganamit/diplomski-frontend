<template>
  <ValidationObserver ref="observer">
    <div>
      <div class="cls">
        <div @click="closeWindowUpdate()">X</div>
      </div>
      <div class="update">
        <form class="form-container">
          <div class="input-div">
            <div class="text-div">Ime:</div>
            <div class="input">
              <ValidationProvider
                name="name"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="text" v-model="model.name" />

                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Prezime:</div>
            <div class="input">
              <ValidationProvider
                name="surname"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="text" v-model="model.surname" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Email:</div>
            <div class="input">
              <ValidationProvider
                name="email"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="text" v-model="model.email" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Lokacija:</div>
            <div class="input">
              <ValidationProvider
                name="location"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="text" v-model="model.location" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <button
            @click="update()"
            type="button"
            style="width: 100%; cursor: pointer"
          >
            Sačuvaj izmjene
          </button>
        </form>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      model: {
        id: null,
        name: "",
        surname: "",
        email: "",
        location: "",
      },
      showError: false,
    };
  },
  created() {
    (this.model.name = this.userById.name),
      (this.model.surname = this.userById.surname),
      (this.model.email = this.userById.email),
      (this.model.location = this.userById.location);
    this.model.id = this.userById.id;
  },
  methods: {
    ...mapActions(["updateUser"]),
    closeWindowUpdate() {
      this.$emit("closed");
    },
    async update() {
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!valid) return;

      await this.updateUser(this.model);
      this.$emit("save");
    },
  },
  computed: {
    ...mapState({
      userById: (state) => state.users.userById,
    }),
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
.cls > div:hover {
  background: #c40404;
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
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: left;
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
button:hover {
  background-color: rgb(16 161 30);
}
.error {
  margin: auto;
  text-align: left;
  color: red;
  background: transparent;
  font-size: 1rem;
}
.input {
  text-align: left;
  position: relative;
  width: 100%;
}
.input-div {
  height: 2rem;
}
input:focus {
  border: 1px solid grey;
}
</style>
