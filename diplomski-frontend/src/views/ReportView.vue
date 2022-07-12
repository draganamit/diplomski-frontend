<template>
  <div class="report-container">
    <div style="border: 1px solid grey">
      <div style="display: flex">
        <div class="date-container" style="border-right: none">
          <div style="display: flex; font-size: 1.2rem">Datum</div>
          <div class="input-date">
            od
            <input type="date" v-model="reportSearchModel.dateFrom" />
            do
            <input type="date" v-model="reportSearchModel.dateTo" />
          </div>
          <div style="display: none" class="btn">
            <button @click="getOrders()">Pretraži</button>
          </div>
        </div>
        <div
          class="date-container"
          style="border-left: none; border-right: none"
        >
          <div style="display: flex; font-size: 1.2rem">Proizvod</div>
          <div class="input-date">
            <select
              name="product"
              class="list"
              v-model="reportSearchModel.productId"
            >
              <option :value="null"></option>
              <option
                v-for="(product, key) in allProducts"
                :key="key"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="date-container" style="border-left: none">
          <div style="display: flex; font-size: 1.2rem">Kategorija</div>
          <div class="input-date">
            <select
              name="product"
              class="list"
              v-model="reportSearchModel.categoryId"
            >
              <option :value="null"></option>

              <option
                v-for="(category, key) in categories"
                :key="key"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="btn">
        <button @click="getOrders()">Pretraži</button>
      </div>
    </div>

    <div class="table-div" v-if="orders.length">
      <table style="width: 100%; border-collapse: collapse">
        <tr style="background-color: rgb(230, 91, 40)">
          <th>Proizvod</th>
          <th>Kategorija</th>
          <th>Kupac</th>
          <th>Prodavač</th>
          <th>Količina</th>
          <th>Cijena</th>
          <th>Datum kupovine</th>
          <th>Ukupna cijena</th>
        </tr>
        <tr
          style="background-color: blanchedalmond"
          v-for="(order, key) in orders"
          :key="key"
        >
          <td>{{ order.product.name }}</td>
          <td>{{ order.product.category.name }}</td>
          <td>{{ order.userBuyer.email }}</td>
          <td>{{ order.product.user.email }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.product.price }} KM</td>
          <td>{{ format_date(order.date) }}</td>
          <td>{{ order.product.price * order.quantity }} KM</td>
        </tr>
        <tr>
          <td
            colspan="7"
            style="
              background-color: rgb(230, 91, 40);
              color: rgb(241, 241, 226);
            "
          >
            Ukupna vrijednost svih narudžbi:
          </td>
          <td
            style="
              background-color: blanchedalmond;
              font-weight: bold;
              font-weight: bold;
            "
          >
            {{ sumprice }} KM
          </td>
        </tr>
      </table>
    </div>
    <div
      style="padding: 1rem 0; font-size: 1.1rem; display: flex; color: red"
      v-if="!orders.length && message"
    >
      Nije ostvarena nijedna prodaja prema datom kriterijumu.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      reportSearchModel: {
        categoryId: null,
        productId: null,
        dateFrom: "",
        dateTo: "",
      },
      message: false,
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      allProducts: (state) => state.products.allProducts,
      orders: (state) => state.orders.orders,
    }),
    sumprice() {
      let sum = 0;
      for (let i = 0; i < this.orders.length; i++) {
        sum += this.orders[i].product.price * this.orders[i].quantity;
      }
      return sum;
    },
  },
  async created() {
    await this.getAllCategories();
    await this.getAllProducts();
  },
  methods: {
    ...mapActions(["getAllCategories", "getAllProducts", "searchOrders"]),
    async getOrders() {
      await this.searchOrders(this.reportSearchModel);
      this.message = true;
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
  },
};
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
}
.date-container {
  display: flex;
  flex-direction: column;

  justify-content: center;

  /* border: 1px solid grey; */
  padding: 1rem;
  margin-top: 0.5rem;
  width: 100%;
}
input {
  width: 100%;
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
  margin: 0 0.5rem;
}
.input-date {
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.btn {
  margin: auto 0.5rem 0.5rem auto;
  padding: 0 1.5rem;
  /* display: none; */
  display: flex;
  justify-content: flex-end;
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
  width: 10%;
  font-size: 1.1rem;
  cursor: pointer;
}
.list {
  width: 100%;
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}
.table-div {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
}
th {
  color: rgb(241, 241, 226);
  text-align: center;
  padding: 0.5rem 1rem;
}
td {
  text-align: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid gray;
}
</style>
