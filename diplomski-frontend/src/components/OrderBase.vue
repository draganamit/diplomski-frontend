<template>
  <div class="order-base">
    <div style="display: flex; flex-direction: column; align-items: flex-start">
      <div class="text-order-product">Proizvod: {{ productName }}</div>
      <div class="text-order-product">Količina: {{ quantity }}</div>
      <div class="text-order-product">{{ typeUser }}: {{ userName }}</div>
    </div>
    <div class="order-state">
      <div class="state">Čeka na potvrdu</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeUser: {
      type: String,
      default: "",
    },
    productName: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: null,
    },
    userName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.order-base {
  display: flex;
  padding: 1rem 0.5rem;
  border: 1px solid grey;
  border-radius: 1rem;
  background-color: blanchedalmond;
  margin-top: 0.8rem;
  width: 100%;
  justify-content: space-between;
}
.text-order-product {
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
}
.order-state {
  display: flex;
  margin-left: auto;
  align-items: center;

  justify-content: center;
}
.state {
  background-color: red;
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
</style>
