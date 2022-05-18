<template>
  <div class="containerUsername">
    <div class="dropdown">
      <div class="namesurname">
        <div>Name Surname</div>
      </div>
      <div class="dropdown-content">
        <a href="/product">Proizvodi</a>
        <a href="/category">Kategorije</a>
        <a href="/users">Korisnici</a>
        <a href="#">Odjavi se</a>
      </div>
    </div>
    <div class="iconNotification">Icon</div>
  </div>
</template>

<script>
export default {};
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
  padding: 0.5rem 1rem;

  font-size: 1rem;
  width: 8rem;
  cursor: pointer;
}
.namesurname > div:hover {
  text-decoration: underline;
}
.iconNotification {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
}
.dropdown {
  position: relative;
  display: inline-block;
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
</style>
