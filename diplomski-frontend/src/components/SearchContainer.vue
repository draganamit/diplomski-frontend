<template>
  <div class="contaner">
    <input type="text" placeholder="Ukucaj proizvod" />
    <button>Pretrazi</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.contaner {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid grey;
}
input {
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
  width: 100%;
  min-width: 10rem;
  max-width: 40rem;
  margin: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
}
</style>
