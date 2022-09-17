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
        :noteBuyer="oredrById.buyerNote"
        @save="away()"
      ></OrderProduct>
    </div>
    <div
      style="
        margin-right: 5rem;
        width: 40rem;
        padding: 1rem;
        background: blanchedalmond;
        padding-right: 2rem;
        height: fit-content;
      "
    >
      <div class="user-order">Vaše narudžbe:</div>
      <OrderBase
        :typeUser="'Prodavac:'"
        v-for="order in ordersByUser"
        :key="order.id"
        :productName="order.product.name"
        :quantity="order.quantity"
        :userName="order.product.user.email"
        :textButton="
          order.confirm
            ? 'Potvrđeno'
            : order.sellerNote == null
            ? 'Čeka na potvrdu'
            : 'Odbijeno'
        "
        :isConfirm="order.confirm"
        :note="order.sellerNote"
        @remove="removeOrder(order.id)"
      ></OrderBase>

      <div v-if="!ordersByUser.length" class="no-order">Nema narudžbi</div>
      <div v-if="ordersByUser.length" class="pagination">
        <div class="page" @click="prevPageByUser()">&#60;</div>
        <div
          class="page"
          :class="{ 'page-selected': pageModelByUser.pageNum == index }"
          v-for="index in pageCountByUser"
          :key="index"
          @click="pageModelByUser.pageNum = index"
        >
          {{ index }}
        </div>
        <div class="page" @click="nextPageByUser()">></div>
      </div>
    </div>
    <div
      style="
        width: 40rem;
        padding: 1rem;
        background: blanchedalmond;
        padding-right: 2rem;
        height: fit-content;
      "
    >
      <div class="user-order">Narudžbe:</div>
      <OrderBase
        :typeUser="'Kupac:'"
        v-for="order in ordersForUser"
        :key="order.id"
        :productName="order.product.name"
        :quantity="order.quantity"
        :userName="order.userBuyer.email"
        :textButton="
          order.confirm
            ? 'Potvrđeno'
            : order.sellerNote == null
            ? 'Čeka na potvrdu'
            : 'Odbijeno'
        "
        :confirmable="true"
        @openConfromWindow="openConfirm(order.id)"
        :isConfirm="order.confirm"
        :note="order.sellerNote"
      ></OrderBase>
      <div v-if="!ordersForUser.length" class="no-order">Nema narudžbi</div>
      <div v-if="ordersForUser.length" class="pagination">
        <div class="page" @click="prevPageForUser()">&#60;</div>
        <div
          class="page"
          :class="{ 'page-selected': pageModelForUser.pageNum == index }"
          v-for="index in pageCountForUser"
          :key="index"
          @click="pageModelForUser.pageNum = index"
        >
          {{ index }}
        </div>
        <div class="page" @click="nextPageForUser()">></div>
      </div>
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
      pageModelForUser: {
        pageNum: 1,
        pageSize: 4,
      },
      pageModelByUser: {
        pageNum: 1,
        pageSize: 4,
      },
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

    async prevPageByUser() {
      if (this.pageModelByUser.pageNum == 1) {
        return;
      }
      this.pageModelByUser.pageNum--;
    },
    async prevPageForUser() {
      if (this.pageModelForUser.pageNum == 1) {
        return;
      }
      this.pageModelForUser.pageNum--;
    },
    async nextPageByUser() {
      if (this.pageModelByUser.pageNum == this.pageCountByUser) {
        return;
      }
      this.pageModelByUser.pageNum++;
    },
    async nextPageForUser() {
      if (this.pageModelForUser.pageNum == this.pageCountForUser) {
        return;
      }
      this.pageModelForUser.pageNum++;
    },
  },
  watch: {
    pageModelForUser: {
      deep: true,
      async handler(newVal) {
        await this.getAllOrdersForUser(newVal);
      },
    },
    pageModelByUser: {
      deep: true,
      async handler(newVal) {
        await this.getAllOrdersByUser(newVal);
      },
    },
  },
  computed: {
    ...mapState({
      ordersByUser: (state) => state.orders.ordersByUser,
      ordersForUser: (state) => state.orders.ordersForUser,
      oredrById: (state) => state.orders.oredrById,
      pageCountForUser(state) {
        return Math.ceil(
          state.orders.totalCountForUser / this.pageModelForUser.pageSize
        );
      },
      pageCountByUser(state) {
        return Math.ceil(
          state.orders.totalCountByUser / this.pageModelByUser.pageSize
        );
      },
    }),
  },
  async created() {
    await this.getAllOrdersByUser(this.pageModelByUser);
    await this.getAllOrdersForUser(this.pageModelForUser);
  },
};
</script>

<style scoped>
.oreder {
  display: flex;
  padding: 3rem 6rem;
}
.user-order {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
  color: rgb(170, 52, 9);
  font-family: cursive;
  font-weight: bold;
}
.order-form {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 5px;
  width: 40%;
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
.no-order {
  display: flex;
  margin-left: 1rem;
  font-size: 1.2rem;
  background: blanchedalmond;
  padding: 0.5rem;
  color: red;
  justify-content: center;
  font-family: cursive;
  font-weight: bold;
}
.pagination {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 0.5rem;
}
.page {
  border: 1px solid #e1e8ee;
  border-radius: 10px;
  padding: 1rem;
  margin-left: 0.5rem;
  background: white;
  font-size: 1rem;
  cursor: pointer;
}
.page:hover {
  background: #e3dbdb;
}
.page-selected {
  background: #e3dbdb;
}
</style>
