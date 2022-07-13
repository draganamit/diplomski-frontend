<template>
  <div class="category-base">
    <div class="name-category">{{ nameCategory }}</div>
    <div class="buttons">
      <div
        @click="openWindow()"
        class="icons"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border-radius: 0.2rem;
          margin-right: 0.3rem;
          cursor: pointer;
        "
      >
        <i class="icon-pencil"></i>
      </div>
      <div
        @click="remove()"
        class="icons"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border-radius: 0.2rem;
          cursor: pointer;
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
.icons {
  padding: 0 0.5rem;
  border-radius: 0.2rem;
  font-size: 1.1rem;
  border-radius: 0.2rem;
  margin: 0 0.3rem;
  cursor: pointer;
}
.icons:hover {
  background: rgb(158 154 154 / 58%);
}
.icon-pencil:hover {
  /* color: white; */
  /* color: #00ffff; */
}

/*
.buttons > div:hover {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(1px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-1px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(1px, 0, 0);
  }
} */
</style>
