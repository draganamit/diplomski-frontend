<template>
  <div class="contaner">
    <input
      type="text"
      placeholder="Ukucaj proizvod"
      v-model="model.name"
      @keyup.enter="getProduct()"
    />
    <button @click="getProduct()">Pretraži</button>
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
      nameProduct: this.$route.query.name ? this.$route.query.name : "",
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
    getProduct() {
      this.$emit("search");

      // let query = Object.assign({}, this.$route.query);
      // query.name = this.nameProduct;
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
.contaner {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* border: 1px solid grey; */
  height: 4.5rem;
}
input {
  padding: 0.7rem 1rem;
  outline: none;
  font-size: 1rem;
  width: 100%;
  min-width: 10rem;
  max-width: 40rem;
  margin: 0.5rem;
  border: none;
}
input:focus {
  border: 1px solid #b5babf;
}
button {
  padding: 0.7rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
</style>
