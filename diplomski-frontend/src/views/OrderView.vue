<template>
  <div class="oreder">
    <div v-if="order" class="order-form">
      <OrderProduct
        @closed="away()"
        :name="oredrById.product.name"
        :price="oredrById.product.price"
        :quantity="oredrById.quantity"
        :images="oredrById.product.images"
        :forConfirm="true"
        :userName="oredrById.userBuyer.name"
        :userSurname="oredrById.userBuyer.surname"
        :userTelephone="oredrById.telephone"
        :userAddress="oredrById.address"
        :orderId="orderId"
        @save="away()"
      ></OrderProduct>
    </div>
    <div class="user-order">Vaše narudžbe:</div>
    <OrderBase
      :typeUser="'Prodavač'"
      v-for="order in ordersByUser"
      :key="order.id"
      :productName="order.product.name"
      :quantity="order.quantity"
      :userName="order.product.user.email"
      :textButton="order.confirm ? 'Potvrđeno' : 'Čeka na potvrdu'"
      :isConfirm="order.confirm"
      @remove="removeOrder(order.id)"
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
      :textButton="order.confirm ? 'Potvrđeno' : 'Čeka na potvrdu'"
      :confirmable="true"
      @openConfromWindow="openConfirm(order.id)"
      :isConfirm="order.confirm"
    ></OrderBase>
    <div
      v-if="!ordersForUser.length"
      style="display: flex; margin-left: 1rem; font-size: 1.5rem"
    >
      Nema narudžbi
    </div>
    <div v-if="order" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import OrderBase from "@/components/OrderBase.vue";
import OrderProduct from "@/components/OrderProduct.vue";

import { mapActions, mapState } from "vuex";
export default {
  components: {
    OrderBase,
    OrderProduct,
  },
  data() {
    return {
      order: false,
      orderId: null,
    };
  },
  methods: {
    ...mapActions([
      "getAllOrdersByUser",
      "getAllOrdersForUser",
      "getOrderById",
      "deleteOrder",
    ]),
    async openConfirm(id) {
      this.orderId = id;
      await this.getOrderById(id);
      this.order = true;
    },
    async away() {
      this.order = false;
      await this.getAllOrdersForUser();
    },
    async removeOrder(id) {
      await this.deleteOrder(id);
      await this.getAllOrdersByUser();
    },
  },
  computed: {
    ...mapState({
      ordersByUser: (state) => state.orders.ordersByUser,
      ordersForUser: (state) => state.orders.ordersForUser,
      oredrById: (state) => state.orders.oredrById,
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
.order-form {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 40%;
  /* width: 60%; */
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
