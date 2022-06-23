<template>
  <div name="cijene" class="container">
    <div class="header">Cijena</div>
    <div class="content justify-between">
      <div class="price">
        Od
        <input type="text" placeholder="od" v-model="priceModel.priceFrom" />
      </div>
      <div class="price">
        Do
        <input type="text" placeholder="do" v-model="priceModel.priceTo" />
      </div>
    </div>
    <div class="search">
      <button @click="getProductByPrice()" type="button">Pretraži</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceModel: {
        priceFrom: this.$route.query.priceFrom
          ? Number(this.$route.query.priceFrom)
          : null,
        priceTo: this.$route.query.priceTo
          ? Number(this.$route.query.priceTo)
          : null,
      },
    };
  },
  methods: {
    getProductByPrice() {
      let query = Object.assign({}, this.$route.query);
      query.priceFrom = this.priceModel.priceFrom;
      query.priceTo = this.priceModel.priceTo;
      this.$router
        .push({
          query: query,
        })
        .catch();
    },
  },
};
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
.justify-between {
  justify-content: space-between;
}
.price {
  display: flex;
  align-items: center;
}
.price:not(:first-child) {
  margin-left: 0.5rem;
}
.price > input {
  width: 10rem;
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
