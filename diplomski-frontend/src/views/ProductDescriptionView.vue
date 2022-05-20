<template>
  <div class="description-div">
    <i class="icon-bin"></i>
    <div v-if="order" class="order-form">
      <OrderProduct @closed="away()"></OrderProduct>
    </div>
    <div class="image-div"></div>
    <div class="description-button">
      <div class="description">
        <div class="text-div">Naziv</div>
        <div class="text-div">Kategorija</div>
        <div class="text-div">Opis</div>
        <div class="text-div">Stanje</div>
        <div class="text-div">Cijena</div>
      </div>
      <div class="button-div">
        <button @click="openOrderWindov()">Naruči</button>
      </div>
    </div>
    <div v-if="order" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import OrderProduct from "@/components/OrderProduct.vue";
export default {
  components: {
    OrderProduct,
  },
  data() {
    return {
      order: false,
    };
  },
  methods: {
    openOrderWindov() {
      this.order = true;
    },
    away() {
      this.order = false;
    },
  },
};
</script>

<style scoped>
.description-div {
  display: flex;
  border: 1px solid grey;
  align-items: center;
  padding: 2rem 10rem;
}
.image-div {
  border: 1px solid grey;
  width: 20rem;
}
.description {
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 0 3rem;
}
.text-div {
  padding: 1rem;
  margin-bottom: 0.5rem;
}
.button-div {
  display: flex;
  justify-content: end;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
.description-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  background-color: blanchedalmond;
}
.order-form {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 60%;
  margin: auto;
  z-index: 2;
  top: 1rem;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
</style>
