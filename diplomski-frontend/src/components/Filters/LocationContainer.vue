<template>
  <div name="lokacija" class="container">
    <div class="header">Lokacija</div>
    <div class="content">
      <input class="location" type="text" />
    </div>
    <div class="search">
      <button type="button">Pretraži</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  margin: 0.5rem 0;
}
.header {
  background-color: rgb(230, 91, 40);
  color: white;
  padding: 0.5rem;
}
.content {
  display: flex;
  padding: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
.location {
  width: 100%;
}
.search {
  margin: auto 0.5rem 0.5rem auto;
}
.search > button {
  padding: 0.5rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
}
input {
  padding: 0.5rem 1rem;
  outline: none;
}
</style>
