<template>
  <div name="cijene" class="container">
    <div class="header">Cijena</div>
    <div class="content justify-between">
      <div class="price">
        od&nbsp;
        <input
          type="text"
          placeholder="od"
          v-model="model.priceFrom"
          @keyup.enter="getProductByPrice()"
        />
      </div>
      <div class="price">
        do&nbsp;
        <input
          type="text"
          placeholder="do"
          v-model="model.priceTo"
          @keyup.enter="getProductByPrice()"
        />
      </div>
    </div>
    <div class="search">
      <button @click="getProductByPrice()" type="button">Pretraži</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
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
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    getProductByPrice() {
      this.$emit("search");

      // let query = Object.assign({}, this.$route.query);
      // query.priceFrom = this.priceModel.priceFrom;
      // query.priceTo = this.priceModel.priceTo;
      // this.$router
      //   .push({
      //     query: query,
      //   })
      //   .catch();
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  margin-bottom: 0;
  height: 9rem;
  margin-top: 0;
}
.header {
  background-color: rgb(230, 91, 40);
  color: white;
  padding: 0.5rem;
  font-weight: bold;
  font-style: italic;
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
  height: 2rem;
  font-family: cursive;
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
  cursor: pointer;
  font-family: cursive;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
input {
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
}
input:focus {
  border: 1px solid #b5babf;
}
</style>
