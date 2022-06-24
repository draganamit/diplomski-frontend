<template>
  <div class="oreder">
    <div class="user-order">Vaše narudžbe:</div>
    <OrderBase :typeUser="'Prodavač'"></OrderBase>
    <div class="user-order">Narudžbe:</div>
    <OrderBase :typeUser="'Kupac'"></OrderBase>
  </div>
</template>

<script>
import OrderBase from "@/components/OrderBase.vue";
export default {
  components: {
    OrderBase,
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
