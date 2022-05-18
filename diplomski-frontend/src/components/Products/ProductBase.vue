<template>
  <div class="container-product" @click="$router.push('/productdescription')">
    <div class="image"></div>
    <div class="name"></div>
    <div class="price"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-product {
  border: 1px solid grey;
  height: 5rem;
  background-color: white;
}
</style>
