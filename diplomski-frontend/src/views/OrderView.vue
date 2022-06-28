<template>
  <div class="oreder">
    <div class="user-order">Vaše narudžbe:</div>
    <OrderBase
      :typeUser="'Prodavač'"
      v-for="order in ordersByUser"
      :key="order.id"
      :productName="order.product.name"
      :quantity="order.quantity"
      :userName="order.product.user.email"
    ></OrderBase>
    <div
      v-if="!ordersByUser.length"
      style="display: flex; margin-left: 1rem; font-size: 1.5rem"
    >
      Nema narudžbi
    </div>
    <div class="user-order">Narudžbe:</div>
    <OrderBase
      :typeUser="'Kupac'"
      v-for="order in ordersForUser"
      :key="order.id"
      :productName="order.product.name"
      :quantity="order.quantity"
      :userName="order.userBuyer.email"
    ></OrderBase>
    <div
      v-if="!ordersForUser.length"
      style="display: flex; margin-left: 1rem; font-size: 1.5rem"
    >
      Nema narudžbi
    </div>
  </div>
</template>

<script>
import OrderBase from "@/components/OrderBase.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    OrderBase,
  },
  methods: {
    ...mapActions(["getAllOrdersByUser", "getAllOrdersForUser"]),
  },
  computed: {
    ...mapState({
      ordersByUser: (state) => state.orders.ordersByUser,
      ordersForUser: (state) => state.orders.ordersForUser,
    }),
  },
  async created() {
    await this.getAllOrdersByUser();
    await this.getAllOrdersForUser();
  },
};
</script>

<style scoped>
.oreder {
  display: flex;
  padding: 3rem 20rem;
  flex-direction: column;
}
.user-order {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
}
</style>
