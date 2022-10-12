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

    <div class="input-container date-col-span">
      <b> Datum </b>
      <div class="date-container">
        <date-picker
          placeholder="od"
          v-model="reportSearchModel.dateFrom"
          format="DD.MM.YYYY"
        >
        </date-picker>

        <date-picker
          placeholder="od"
          v-model="reportSearchModel.dateTo"
          format="DD.MM.YYYY"
        >
        </date-picker>
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
    <div v-else name="empty_div"></div>

    <div class="radio-container radio-col-span">
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: { DatePicker },
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

<style>
.mx-datepicker > .mx-input-wrapper > input {
  border: none;
}
</style>
<style scoped>
.mx-datepicker {
  width: 100%;
}
.container {
  padding: 1rem;
  background: blanchedalmond;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  font-family: cursive;
}
.radio-col-span {
  grid-column: span 2 / span 2;
}
@media (max-width: 1290px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
  .date-col-span {
    grid-column: span 2 / span 2;
  }
  .radio-col-span {
    grid-column: span 1 / span 1;
  }
}
@media (max-width: 1040px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
  .date-col-span {
    grid-column: span 1 / span 1;
  }
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
  gap: 1rem;
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
  padding-top: 0.3rem;
  margin: 0 1rem;
  gap: 2rem;
  margin-left: auto;
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
  font-family: cursive;
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
