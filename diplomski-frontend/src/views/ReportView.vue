<template>
  <div class="report-container">
    <ReportSearch @order="orderProduct()" />
    <div class="table-div" v-if="orders.length">
      <table style="width: 100%; border-collapse: collapse">
        <tr style="background-color: rgb(230, 91, 40)">
          <th>Proizvod</th>
          <th>Kategorija</th>
          <th>Kupac</th>
          <th>Proizvođač</th>
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
      style="
        padding: 1rem 0.5rem;
        font-size: 1.1rem;
        display: flex;
        color: red;
        background: blanchedalmond;
        margin-top: 1rem;
      "
      v-if="!orders.length && message"
    >
      Nije ostvarena nijedna prodaja prema datom kriterijumu.
    </div>
  </div>
</template>

<script>
import ReportSearch from "@/components/Report/ReportSearch.vue";
import { mapState } from "vuex";
import moment from "moment";
export default {
  components: {
    ReportSearch,
  },
  data() {
    return {
      message: false,
    };
  },
  computed: {
    ...mapState({
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

  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD.MM.YYYY");
      }
    },
    orderProduct() {
      this.message = true;
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
