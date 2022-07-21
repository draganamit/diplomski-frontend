<template>
  <div class="forgot-div">
    <div class="forgot-form">
      <div class="label">
        <label>Email:</label>
      </div>
      <div class="input">
        <input type="text" v-model="email" />
      </div>
      <div class="btn">
        <button type="button" @click="reset()">Pošalji</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    ...mapActions(["resetPassword"]),
    async reset() {
      await this.resetPassword(this.email);
      alert("Lozinka uspjesno resetovana");
      // window.location = "/";
    },
  },
};
</script>

<style scoped>
.forgot-form {
  display: flex;
  justify-content: center;
  align-content: center;

  padding: 2rem;
  width: 30%;
  flex-direction: column;
  position: absolute;
  top: 15rem;
  background: blanchedalmond;
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
  height: 2.7rem;
}
input {
  width: 100%;
  display: flex;
  background: white;
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.7rem 1rem;
  outline: none;
}
.forgot-div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.btn {
  margin-left: auto;
  padding-top: 1rem;
}
button {
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  background: #e65b28;
  border: none;
  color: white;
}
.input-div {
  height: 2rem;
}
input:focus {
  border: 1px solid grey;
}
</style>
