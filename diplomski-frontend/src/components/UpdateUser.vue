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
            <input type="text" v-model="name" />
          </div>
          <div>
            <div class="text-div">Prezime:</div>
            <input type="text" v-model="surname" />
          </div>
          <div>
            <div class="text-div">Email:</div>
            <input type="text" v-model="email" />
          </div>
          <div>
            <div class="text-div">Lokacija:</div>
            <input type="text" v-model="location" />
          </div>
          <button style="width: 100%">Sačuvaj izmjene</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: "",
        surname: "",
        email: "",
        location: "",
      },
    };
  },
  methods: {
    closeWindowUpdate() {
      this.$emit("closed");
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
