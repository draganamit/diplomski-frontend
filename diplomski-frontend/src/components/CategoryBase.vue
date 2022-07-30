<template>
  <div class="category-base">
    <div class="name-category">{{ nameCategory }}</div>
    <div class="buttons">
      <div @click="openWindow()" class="update-product">
        <i style="color: #e65b28; font-size: 1.2rem" class="icon-pencil"></i>
      </div>
      <div @click="remove()" class="update-product">
        <i style="color: #b70707" class="icon-bin"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nameCategory: {
      type: String,
      default: "",
    },
  },
  methods: {
    openWindow() {
      this.$emit("open");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style scoped>
.category-base {
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;

  border-radius: 1rem;
  background-color: blanchedalmond;
  margin-top: 0.8rem;
  width: 100%;
  justify-content: space-between;
}
.name-category {
  font-size: 1.4rem;
  font-family: cursive;
  padding-left: 1rem;
}
.buttons {
  display: flex;
}
.icons {
  padding: 0 0.5rem;
  border-radius: 0.2rem;
  font-size: 1.1rem;
  border-radius: 0.2rem;
  margin: 0 0.3rem;
  cursor: pointer;
}
.update-product {
  padding: 0.2rem 0.6rem;
  font-size: 1.2rem;

  border-radius: 0.2rem;
  margin-right: 0.3rem;
  cursor: pointer;
  background: #d8d1d1;
}
.update-product:hover {
  background: #bdb6b6;
}
</style>
