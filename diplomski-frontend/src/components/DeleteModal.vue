<template>
  <div class="delete-modal">
    <i
      class="icon-question-circle-o"
      style="font-size: 5rem; color: #007fff"
    ></i>
    <div class="question">
      {{ textQuestion }}
    </div>
    <div class="buttons">
      <div @click="remove()" class="button-yes">Da</div>
      <div @click="close()" class="button-no">Ne</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textQuestion: {
      type: String,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style scoped>
.delete-modal {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  min-width: 450px;
  border-radius: 0.5rem;
  width: 30%;
  margin: auto;
  z-index: 2;
  padding: 1rem;
  padding-bottom: 2rem;
  padding-top: 3rem;
}
.question {
  padding: 2rem 1rem;
  font-size: 1.2rem;
}
.buttons {
  display: flex;
  justify-content: center;
}
.button-yes {
  background: #007fff;
  padding: 0.5rem 2rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.button-yes:hover {
  background: #0474e4;
}
.button-no {
  background: #b6b6b6;
  padding: 0.5rem 2rem;

  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.button-no:hover {
  background: #aaa8a8;
}
</style>
