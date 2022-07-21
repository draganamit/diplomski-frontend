<template>
  <div class="container">
    <div class="input-container">
      <b>Proizvod</b>
      <select name="product" class="list" v-model="reportSearchModel.productId">
        <option :value="null">-- Izaberite proizvod --</option>
        <option
          v-for="(product, key) in products"
          :key="key"
          :value="product.id"
        >
          {{ product.name }}
        </option>
      </select>
    </div>

    <div class="input-container">
      <b>Kategorija</b>
      <select
        name="product"
        class="list"
        v-model="reportSearchModel.categoryId"
      >
        <option :value="null">-- Izaberite kategoriju --</option>

        <option
          v-for="(category, key) in categories"
          :key="key"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="input-container">
      <b> Datum </b>
      <div class="date-container">
        <span> od </span>
        <input type="date" v-model="reportSearchModel.dateFrom" />
        <span> do </span>
        <input type="date" v-model="reportSearchModel.dateTo" />
      </div>
    </div>

    <div class="input-container" v-if="user.type == 0">
      <b> Korisnik </b>
      <select name="user" class="list" v-model="reportSearchModel.userId">
        <option :value="null">-- Izaberite korisnika --</option>
        <option v-for="(user, key) in users" :key="key" :value="user.id">
          {{ user.email }}
        </option>
      </select>
    </div>

    <div
      class="radio-container"
      :class="user && user.type == 0 ? 'col-span-2' : 'col-span-3'"
    >
      <div class="input-container">
        <label for="sale">
          <input
            id="sale"
            type="radio"
            value="true"
            v-model="reportSearchModel.sale"
          />
          Prodaja
        </label>
      </div>
      <div class="input-container">
        <label for="not_sale">
          <input
            id="not_sale"
            type="radio"
            value="false"
            v-model="reportSearchModel.sale"
          />
          Kupovina
        </label>
      </div>
      <button @click="getOrders()">Pretraži</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      reportSearchModel: {
        categoryId: null,
        productId: null,
        userId: null,
        dateFrom: "",
        dateTo: "",
        sale: "true",
      },
    };
  },
  async created() {
    await this.getAllCategories();
    await this.getAllProducts();
    await this.getAllUsers();
    await this.getAllUserProducts();
    await this.getUserByUser();
  },
  computed: {
    ...mapState({
      allCategories: (state) => state.categories.categories,
      allProducts: (state) => state.products.allProducts,
      allUserProducts: (state) => state.products.allUserProducts,

      orders: (state) => state.orders.orders,
      users: (state) => state.users.users,
      user: (state) => state.users.user,
    }),
    allUserCategories() {
      const all = this.allUserProducts.map((x) => {
        return {
          id: x.category.id,
          name: x.category.name,
        };
      });
      let distinct = [];
      all.forEach((el) => {
        if (distinct.findIndex((x) => x.id == el.id) == -1) {
          distinct.push(el);
        }
      });
      return distinct;
    },
    products() {
      if (this.user && this.user.type == 0) return this.allProducts;
      if (this.user && this.user.type == 1) return this.allUserProducts;
      return [];
    },
    categories() {
      if (this.user && this.user.type == 0) return this.allCategories;
      if (this.user && this.user.type == 1) return this.allUserCategories;
      return [];
    },
    sumprice() {
      let sum = 0;
      for (let i = 0; i < this.orders.length; i++) {
        sum += this.orders[i].product.price * this.orders[i].quantity;
      }
      return sum;
    },
  },
  methods: {
    ...mapActions([
      "getAllCategories",
      "getAllProducts",
      "searchOrders",
      "getAllUsers",
      "getAllUserProducts",
      "getUserByUser",
    ]),

    async getOrders() {
      await this.searchOrders(this.reportSearchModel);
      // this.message = true;
      this.$emit("order");
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (newVal.type == 0) {
            this.reportSearchModel.userId = null;
          } else {
            this.reportSearchModel.userId = newVal.id;
          }
        }
      },
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
  background: blanchedalmond;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.input-container > label {
  display: flex;
  margin-left: auto;
  cursor: pointer;
}
.date-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.date-container > span {
  margin: 0 0.5rem;
}
b {
  padding: 0 0.5rem;
}
.radio-container {
  display: flex;
  align-items: center;

  margin: 0 1rem;
  gap: 2rem;
  margin-left: auto;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.col-span-3 {
  grid-column: span 3 / span 3;
}
input[type="radio"] {
  width: 1rem;
}
input[type="radio"]:checked {
  accent-color: rgb(230, 91, 40);
}
input {
  width: 100%;
  display: flex;
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
  margin: 0 0.5rem;
}
input[type="date"] {
  margin: 0;
}
button {
  padding: 0.5rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: auto;

  font-size: 1rem;
  cursor: pointer;

  margin-left: auto;
}
button:hover {
  background-color: rgb(193 73 28);
}
.list {
  width: 100%;
  display: flex;
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}
</style>
