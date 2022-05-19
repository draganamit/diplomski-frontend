<template>
  <div>
    <div class="cls">
      <div @click="closeWindow()">X</div>
    </div>
    <div class="update">
      <div class="form-container">
        <form>
          <div>
            <div class="text-div">Trenutna lozinka:</div>
            <input type="text" v-model="oldPassword" />
          </div>
          <div>
            <div class="text-div">Nova lozinka:</div>
            <input type="text" v-model="newPassword" />
          </div>
          <div>
            <div class="text-div">Potvrdite lozinku:</div>
            <input type="text" v-model="confirmPassword" />
          </div>
          <button style="width: 100%; background-color: rgb(183 28 11)">
            Sačuvaj izmjene
          </button>
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
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      close: false,
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closed");
    },
  },
};
</script>

<style scoped>
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
.form-container {
  margin-bottom: 1rem;
}
form > div {
  display: flex;
  padding: 1rem;
  font-size: 1.2rem;
}
.update {
  padding: 2rem 1rem;
}
.text-div {
  width: 20rem;
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
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 1rem 1rem;
  margin-bottom: 0.2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>
