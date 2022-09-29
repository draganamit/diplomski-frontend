<template>
  <div class="order-base">
    <div style="display: flex">
      <div
        style="display: flex; flex-direction: column; align-items: flex-start"
      >
        <div class="text-order-product">
          <b>{{ productName }}</b>
        </div>
        <div class="text-order-product"><b>Količina:</b> {{ quantity }}</div>
        <div class="text-order-product">
          <b>{{ typeUser }} </b> {{ userName }}
        </div>
      </div>

      <div class="order-state" style="flex-direction: column">
        <div
          style="margin-bottom: 0.2rem"
          class="state"
          :class="
            confirmable
              ? isConfirm
                ? 'green'
                : note == null
                ? 'yellow'
                : 'red'
              : isConfirm
              ? 'green'
              : note == null
              ? 'grey'
              : 'red'
          "
          @click.stop="confirmOpen()"
        >
          {{ textButton }}
        </div>

        <div
          style="cursor: pointer"
          class="state"
          v-if="!isConfirm && !confirmable && note == null"
          @click.stop="remove()"
        >
          Opozovi
        </div>
      </div>
    </div>
    <div
      v-if="note != null && note != '' && !confirmable"
      style="color: red; bottom: 0"
      class="text-order-product"
    >
      Napomena: {{ note }}
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
    note: {
      type: String,
      default: "",
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
  flex-direction: column;
  padding: 1rem 0.5rem;
  font-family: cursive;
  border-radius: 1rem;
  background-color: white;
  margin-top: 0.8rem;
  width: 100%;
  justify-content: space-between;
  position: relative;
  padding-bottom: 2rem;
}
.text-order-product {
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
  text-align: left;
}
.order-state {
  display: flex;
  margin-left: auto;
  align-items: center;

  justify-content: center;
}
.state {
  background-color: #ff1717;
  color: white;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
.state:hover {
  background-color: #d00d0d;
}
.green {
  color: white;
  pointer-events: none;
  background: #06a95e;
}
.yellow {
  background: rgb(238 164 39);
  color: white;
  cursor: pointer;
}
.yellow:hover {
  background: rgb(204 136 20);
}
.grey {
  background: #8f8f8f;

  pointer-events: none;
  color: white;
}
.red {
  pointer-events: none;
  color: white;
  background-color: #ff1717;
}
</style>
