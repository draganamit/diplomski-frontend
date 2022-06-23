<template>
  <div class="user-container">
    <div class="users-title">
      <div>Korisnici</div>
    </div>
    <div class="table-div">
      <table style="width: 100%; border-collapse: collapse">
        <tr style="background-color: rgb(230, 91, 40)">
          <th>Korisničko ime</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th style="text-align: right">Opcije</th>
        </tr>
        <tr
          style="background-color: blanchedalmond"
          v-for="(user, key) in users"
          :key="key"
          @click="setIdUser(user.id)"
        >
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td style="text-align: right">
            <i class="icon-pencil"></i>
            <i class="icon-bin"></i>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["getAllUsers"]),
    setIdUser(id) {
      // this.$router.push({ name: "userprofile" }),
      this.$router
        .push({
          name: "userprofile",
          query: {
            //idUser: id,
            userId: id,
          },
        })
        .catch();
    },
  },
  async created() {
    await this.getAllUsers();
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  padding: 3rem 12rem;
  flex-direction: column;
}
.users-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.table-div {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
}
th {
  color: rgb(241, 241, 226);
  text-align: left;
  padding: 0.5rem 1rem;
}
td {
  text-align: left;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid gray;
}
a {
  text-decoration: none;
  color: black;
}
</style>
