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
        <tr style="background-color: blanchedalmond">
          <td>
            <a href="/userprofile">admin@gmail.com</a>
          </td>
          <td>Admin</td>
          <td>Admin Admin</td>
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
export default {};
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
}
a {
  text-decoration: none;
  color: black;
}
</style>
