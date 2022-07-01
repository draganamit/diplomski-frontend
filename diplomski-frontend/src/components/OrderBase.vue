<template>
  <div class="order-base">
    <div style="display: flex; flex-direction: column; align-items: flex-start">
      <div class="text-order-product">Proizvod: {{ productName }}</div>
      <div class="text-order-product">Količina: {{ quantity }}</div>
      <div class="text-order-product">{{ typeUser }}: {{ userName }}</div>
    </div>
    <div class="order-state" style="flex-direction: column">
      <div
        style="margin-bottom: 0.2rem"
        class="state"
        :class="
          confirmable
            ? isConfirm
              ? 'green'
              : 'yellow'
            : isConfirm
            ? 'green'
            : 'grey'
        "
        @click.stop="confirmOpen()"
      >
        {{ textButton }}
      </div>

      <div
        style="cursor: pointer"
        class="state"
        v-if="!isConfirm && !confirmable"
        @click.stop="remove()"
      >
        Opozovi
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textButton: {
      type: String,
      default: "",
    },
    typeUser: {
      type: String,
      default: "",
    },
    productName: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: null,
    },
    userName: {
      type: String,
      default: "",
    },
    confirmable: {
      type: Boolean,
      default: false,
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirmOpen() {
      this.$emit("openConfromWindow");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style scoped>
.order-base {
  display: flex;
  padding: 1rem 0.5rem;
  border: 1px solid grey;
  border-radius: 1rem;
  background-color: blanchedalmond;
  margin-top: 0.8rem;
  width: 100%;
  justify-content: space-between;
}
.text-order-product {
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
}
.order-state {
  display: flex;
  margin-left: auto;
  align-items: center;

  justify-content: center;
}
.state {
  background-color: red;
  color: #605858;
  border: 1px solid gray;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
.green {
  background: #77ef00;

  pointer-events: none;
}
.yellow {
  background: #f1f400;

  cursor: pointer;
}
.grey {
  background: #bcbcbc;

  pointer-events: none;
}
</style>
