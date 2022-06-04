<template>
  <div class="containerUsername">
    <div class="dropdown">
      <div class="namesurname">
        <i class="icon-user-circle-o" style="font-size: 1.5rem"></i>
        <div style="display: flex; align-items: center; margin: 0 0.5rem">
          {{ fullName }}
        </div>
      </div>
      <div class="relative">
        <div class="dropdown-content">
          <a @click="$router.push({ name: 'product' })">Proizvodi</a>
          <a href="/category">Kategorije</a>
          <a href="/users">Korisnici</a>
          <a @click="Logout()">Odjavi se</a>
        </div>
      </div>
    </div>
    <div class="iconNotification">
      <i class="icon-notification" style="font-size: 1.5rem"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      fullName(state) {
        return state.users.user.name + " " + state.users.user.surname;
      },
    }),
  },
  methods: {
    Logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
.containerUsername {
  margin-left: auto;
  display: flex;
  padding: 0.5rem;
}
.namesurname {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.namesurname > div:hover {
  text-decoration: underline;
}
.iconNotification {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  z-index: 1;
  font-size: 1.2rem;
  width: 12rem;
  right: 0;
}
.dropdown-content a {
  color: black;
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  display: block;
  text-align: start;
}
.dropdown-content a:hover {
  background-color: #f1f1f1;
}
.relative {
  position: relative;
}
</style>
