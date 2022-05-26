<template>
  <div>
    <div class="cls">
      <div @click="closeWindowOrder()">X</div>
    </div>
    <div class="order-div">
      <div class="oreder-product">
        <div class="image"></div>
        <div product-information>
          <div class="text">Naziv</div>
          <div class="text">Cijena</div>
        </div>
        <div class="quantity">
          <div>Izaberite kolicinu</div>
        </div>
      </div>
      <div class="user-div">
        <div class="user-form">
          <div>Lični podaci</div>
          <div>
            <div class="form-text">Ime*</div>
            <input type="text" />
          </div>
          <div>
            <div class="form-text">Prezime*</div>
            <input type="text" />
          </div>
          <div>
            <div class="form-text">Telefon*</div>
            <input type="text" />
          </div>
          <div>
            <div class="form-text">Grad*</div>
            <input type="text" />
          </div>
          <div>
            <div class="form-text">Adresa*</div>
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="sum-order">
        <div class="sum">
          <div>Ukupno:</div>
        </div>
        <div class="order-button">
          <button>Naruči</button>
        </div>
      </div>
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
  justify-content: flex-end;
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
.order-div {
  padding: 1rem 1rem;

  display: flex;
  flex-direction: column;
}
.oreder-product {
  border: 1px solid black;
  display: flex;
  padding: 00.2rem;
  margin-bottom: 1rem;
}
.image {
  border: 1px solid black;
  width: 7rem;
}
.text {
  padding: 1rem;
  font-size: 1rem;
}
.quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  padding: 1rem;
  font-size: 1rem;
}
.user-div {
  display: flex;
  padding: 1rem 1rem;
  border: 1px solid black;
}
.user-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-form > div {
  padding-bottom: 1rem;
  font-size: 1rem;
  display: flex;
}
.form-text {
  width: 6rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
input {
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}
.sum-order {
  display: flex;
  padding: 1rem 1rem;
  border: 1px solid black;
  margin: 1rem;
}
.sum {
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.order-button {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
</style>
