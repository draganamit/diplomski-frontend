<template>
  <div class="forgot-div">
    <div class="forgot-form">
      <div class="label">
        <label>Email:</label>
      </div>
      <div class="input">
        <input @keyup.enter="reset()" type="text" v-model="email" />
      </div>
      <div style="color: red" v-if="noUserExist">Korisnik ne postoji.</div>
      <div class="btn">
        <button type="button" @click="reset()">Pošalji</button>
      </div>
    </div>
    <div v-if="send" class="info-modal">
      <i class="icon-info" style="font-size: 3rem; color: #007fff"></i>
      <div class="question">
        Lozinka je uspješno resetovana.<br />Nova lozinka će vam stići na mail.
      </div>
      <div class="buttons">
        <div @click="away()" class="button-yes">Ok</div>
      </div>
    </div>
    <div v-if="send" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      send: false,
    };
  },
  computed: {
    ...mapState({
      noUserExist: (state) => state.users.noUserExist,
    }),
  },
  methods: {
    ...mapActions(["resetPassword"]),
    async reset() {
      await this.resetPassword(this.email);
      if (this.noUserExist) {
        this.send = false;
      } else {
        this.send = true;
      }

      // alert("Lozinka uspjesno resetovana");
      // window.location = "/";
    },
    away() {
      this.send = false;
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
  font-family: cursive;
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
  font-family: cursive;
  border-radius: 5px;
}
.input-div {
  height: 2rem;
}
input:focus {
  border: 1px solid grey;
}
.info-modal {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 0.5rem;
  width: 20rem;
  margin: auto;
  z-index: 2;
  padding: 1rem;
  padding-bottom: 2rem;
  padding-top: 3rem;
  top: 1rem;
}
.question {
  padding: 2rem 1rem;
  font-size: 1.2rem;
}
.button-yes {
  background: #007fff;
  padding: 0.5rem 2rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.button-yes:hover {
  background: #0474e4;
}
.buttons {
  display: flex;
  justify-content: center;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
</style>
