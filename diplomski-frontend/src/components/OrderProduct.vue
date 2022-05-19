<template>
  <div>
    <div class="cls">
      <div @click="closeWindowOrder()">X</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeWindowOrder() {
      this.$emit("closed");
    },
  },
};
</script>

<style scoped>
.cls {
  display: flex;
  justify-content: end;
  align-items: center;
}
.cls > div {
  color: white;
  border: 1px solid white;
  background: red;
  cursor: pointer;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  padding: 0.3rem 0;
}
</style>
