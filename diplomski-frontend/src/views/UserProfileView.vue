<template>
  <div>
    <div class="btn-update-password">
      <button>Promijeni lozinku</button>
    </div>
    <div class="user-imformation">
      <div class="user-div">
        <div>Admin Admin</div>
        <div>admin@gmail.com</div>
        <div>Lokacija</div>
        <button style="width: 100%">Azuriraj</button>
      </div>
    </div>
    <div class="proizvodi-title">
      <div>Proizvodi</div>
    </div>
    <div class="show-products">
      <ProductContainer></ProductContainer>
    </div>
  </div>
</template>

<script>
import ProductContainer from "@/components/Products/ProductContainer.vue";
export default {
  components: {
    ProductContainer,
  },
};
</script>

<style scoped>
.btn-update-password {
  display: flex;
  justify-content: end;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
}
.user-imformation {
  display: flex;
  justify-content: start;
  padding: 1rem 3rem;
}
.user-div {
  border: 1px solid black;
  width: 30rem;
  height: 20rem;
}
.proizvodi-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem 3rem;
}
.show-products {
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
}
</style>
