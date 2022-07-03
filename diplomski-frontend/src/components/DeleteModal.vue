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
  border: 1px solid black;
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
}
.button-no {
  background: #adabab;
  padding: 0.5rem 2rem;

  border-radius: 5px;
  color: white;
}
</style>
