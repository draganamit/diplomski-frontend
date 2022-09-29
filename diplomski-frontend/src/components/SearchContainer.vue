<template>
  <div
    class="contaner"
    :class="{ 'menu-trasnalte': showMenu, 'menu-translate-out': !showMenu }"
  >
    <i class="menu icon-menu" @click="toggleManu"></i>
    <input
      type="text"
      placeholder="Pretraži proizvode"
      v-model="model.name"
      @keyup.enter="getProduct()"
    />
    <button @click="getProduct()">Pretraži</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nameProduct: this.$route.query.name ? this.$route.query.name : "",
    };
  },
  computed: {
    ...mapState({
      showMenu: (state) => state.showMenu,
    }),
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    ...mapMutations(["toggleManu"]),
    getProduct() {
      this.$emit("search");
    },
  },
};
</script>

<style scoped>
.contaner {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
@media (max-width: 1024px) {
  .contaner {
    justify-content: space-between;
  }
}
.menu {
  padding: 0.7rem 1rem;
  /* background: white; */
  display: none;
  cursor: pointer;

  background: rgb(230, 91, 40);
  color: white;
  /* transform: translateX(-2rem); */
}
.menu-trasnalte {
  transform: translateX(-2rem);
  transition: all;
  transition-duration: 300ms;
  transition-timing-function: linear;
}
.menu-trasnalte-out {
  transform: translateX(0.1rem);
  transition: all;
  transition-duration: 300ms;
  transition-timing-function: linear;
}
@media (max-width: 1024px) {
  .menu {
    display: block;
  }
}
input {
  padding: 0.7rem 1rem;
  outline: none;
  font-size: 1rem;
  width: 100%;
  min-width: 10rem;
  max-width: 40rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
}
input:focus {
  border: 1px solid #b5babf;
}
button {
  padding: 0.5rem 1rem;
  background-color: rgb(230, 91, 40);
  color: white;
  outline: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-family: cursive;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
/* @media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }| */
</style>
