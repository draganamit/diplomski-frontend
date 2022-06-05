<template>
  <div class="category-base">
    <div class="name-category">{{ nameCategory }}</div>
    <div class="buttons">
      <div
        @click="openWindow()"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border: 1px solid grey;
          border-radius: 0.2rem;
          margin-right: 0.3rem;
        "
      >
        <i class="icon-pencil"></i>
      </div>
      <div
        @click="remove()"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border: 1px solid grey;
          border-radius: 0.2rem;
        "
      >
        <i class="icon-bin"></i>
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
  border: 1px solid grey;
  border-radius: 1rem;
  background-color: blanchedalmond;
  margin-top: 0.8rem;
  width: 100%;
  justify-content: space-between;
}
.name-category {
  font-size: 1.5rem;
}
.buttons {
  display: flex;
}
</style>
