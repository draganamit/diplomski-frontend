<template>
  <div class="category-base">
    <div class="name-category">Naziv kategorije</div>
    <div class="buttons">Ikonice</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.category-base {
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border: 1px solid grey;
  border-radius: 1rem;
  background-color: blanchedalmond;
  margin-top: 0.8rem;
}
.name-category {
  font-size: 1.5rem;
}
.buttons {
  margin-left: 20rem;
}
</style>
