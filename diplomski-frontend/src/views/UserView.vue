<template>
  <div class="user-container">
    <DeleteModal
      v-if="block || active"
      @close="away()"
      @remove="setBlockUser()"
      :textQuestion="
        block
          ? 'Da li ste sugurni da želite da blokirate korisnika?'
          : 'Da li ste sugurni da želite da aktivirate korisnika?'
      "
    ></DeleteModal>
    <div class="users-title">
      <!-- <div>Korisnici</div> -->
    </div>
    <div class="table-div">
      <table
        style="width: 100%; border-collapse: collapse; font-family: cursive"
      >
        <tr class="thr" style="background-color: rgb(230, 91, 40)">
          <th>Korisničko ime</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th style="text-align: right">Opcije</th>
        </tr>
        <tr
          style="background-color: blanchedalmond; cursor: pointer"
          v-for="(user, key) in users"
          :key="key"
          @click="setIdUser(user.id)"
        >
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td style="text-align: right">
            <div
              :class="user.isDeleted ? 'active' : 'block'"
              @click.stop="setIsDelete(user.id, user.isDeleted)"
            >
              {{ user.isDeleted ? "Aktiviraj" : "Blokiraj" }}
            </div>
            <!-- <i class="icon-pencil"></i>
            <i class="icon-bin"></i> -->
          </td>
        </tr>
      </table>
    </div>
    <div v-if="block || active" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  components: {
    DeleteModal,
  },
  data() {
    return {
      id: null,
      block: false,
      active: false,
    };
  },
  methods: {
    ...mapActions(["getAllUsers", "blockUser"]),
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
    setIsDelete(id, deleted) {
      if (deleted == false) {
        this.block = true;
      } else {
        this.active = true;
      }
      this.id = id;
    },
    async setBlockUser() {
      await this.blockUser(this.id);
      this.block = false;
      this.active = false;

      await this.getAllUsers();
    },
    away() {
      this.block = false;
      this.active = false;
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
@media (max-width: 1536px) {
  .user-container {
    padding: 3rem 10rem;
  }
}
@media (max-width: 1280px) {
  .user-container {
    padding: 3rem 8rem;
  }
}
@media (max-width: 1024px) {
  .user-container {
    padding: 3rem 5rem;
  }
}
@media (max-width: 768px) {
  .user-container {
    padding: 3rem 3rem;
  }
}
@media (max-width: 640px) {
  .user-container {
    padding: 3rem 1rem;
  }
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
.block {
  cursor: pointer;
  color: #e90c0c;
}
.active {
  color: rgb(5, 162, 5);
  cursor: pointer;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
tr:hover:not(.thr) {
  background-color: #e8d0ad !important;
}
.block:hover {
  text-decoration: underline;
}
.active:hover {
  text-decoration: underline;
}
</style>
