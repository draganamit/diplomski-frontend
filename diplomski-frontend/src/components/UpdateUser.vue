<template>
  <div>
    <div class="cls">
      <div @click="closeWindowUpdate()">X</div>
    </div>
    <div class="update">
      <div class="form-container">
        <form>
          <div>
            <div class="text-div">Ime:</div>
            <input type="text" v-model="model.name" />
          </div>
          <div>
            <div class="text-div">Prezime:</div>
            <input type="text" v-model="model.surname" />
          </div>
          <div>
            <div class="text-div">Email:</div>
            <input type="text" v-model="model.email" />
          </div>
          <div>
            <div class="text-div">Lokacija:</div>
            <input type="text" v-model="model.location" />
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
  </div>
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
</style>
