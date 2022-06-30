<template>
  <div>
    <div class="cls">
      <div @click="closeWindowOrder()">X</div>
    </div>
    <div class="order-div">
      <div class="oreder-product">
        <div class="image">
          <img :src="'http://localhost:5000/Images/' + images[0]" alt="" />
        </div>
        <div class="product-information">
          <div class="text">Naziv: {{ name }}</div>
          <div class="text">Cijena: {{ price }}KM</div>
        </div>
        <div class="product-information" v-if="forConfirm">
          <div class="text">Količina: {{ quantity }}</div>
          <div class="text">Ukupna cijena: {{ sumConfirm }}KM</div>
        </div>

        <div class="quantity" v-if="forOrder">
          <div>Izaberite kolicinu</div>
          <div class="wrapper">
            <button
              class="btn btn--minus"
              @click="changeCounter('-1')"
              type="button"
              name="button"
            >
              -
            </button>
            <input
              class="quantityinput"
              type="text"
              name="name"
              :value="model.quantity"
            />
            <button
              class="btn btn--plus"
              @click="changeCounter('1')"
              type="button"
              name="button"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="user-div">
        <div class="user-form">
          <div>
            Lični podaci &nbsp;
            <div v-if="forConfirm">o kupcu</div>
          </div>
          <div>
            <div class="form-text">Ime*</div>
            <input
              v-if="forConfirm"
              class="from-input"
              type="text"
              disabled
              v-model="nameUser"
            />
            <input
              v-if="forOrder"
              class="from-input"
              type="text"
              disabled
              v-model="user.name"
            />
          </div>
          <div>
            <div class="form-text">Prezime*</div>
            <input
              v-if="forConfirm"
              class="from-input"
              type="text"
              disabled
              v-model="surnameUser"
            />
            <input
              v-if="forOrder"
              class="from-input"
              type="text"
              disabled
              v-model="user.surname"
            />
          </div>
          <div>
            <div class="form-text">Telefon*</div>
            <input
              v-if="forConfirm"
              class="from-input"
              type="text"
              disabled
              v-model="telephoneUser"
            />

            <input
              v-if="forOrder"
              class="from-input"
              type="text"
              v-model="model.telephone"
            />
          </div>
          <div>
            <div class="form-text">Grad*</div>
            <input class="from-input" type="text" />
          </div>
          <div>
            <div class="form-text">Adresa*</div>
            <input
              v-if="forConfirm"
              class="from-input"
              type="text"
              disabled
              v-model="addressUser"
            />
            <input
              v-if="forOrder"
              class="from-input"
              type="text"
              v-model="model.address"
            />
          </div>
        </div>
      </div>
      <div class="sum-order" v-if="forOrder">
        <div class="sum">
          <div>Ukupno: {{ sum }}KM</div>
        </div>
        <div class="order-button" style="margin-left: auto">
          <button @click="order()" type="button" class="btnOrder">
            Naruči
          </button>
        </div>
      </div>
      <div class="sum-order" v-if="forConfirm" style="margin-left: auto">
        <div class="order-button">
          <button @click="removeOrder()" type="button" class="btnOrder">
            Odbaci
          </button>
        </div>
        <div class="order-button">
          <button @click="changeConfrim()" type="button" class="btnOrder">
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    userSurname: {
      type: String,
      default: "",
    },
    userTelephone: {
      type: String,
      default: "",
    },
    userAddress: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: null,
    },
    state: {
      type: Number,
      default: null,
    },
    images: {
      type: Array,
      default: () => [],
    },
    quantity: {
      type: Number,
      default: null,
    },
    forConfirm: {
      type: Boolean,
      default: false,
    },
    forOrder: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      nameUser: this.userName,
      surnameUser: this.userSurname,
      telephoneUser: this.userTelephone,
      addressUser: this.userAddress,
      model: {
        productId: Number(this.$route.query.productId),
        confirm: false,
        telephone: "",
        address: "",
        quantity: 1,
      },
      modelConfirm: {
        idOrder: this.orderId,
        confirm: false,
      },
    };
  },
  computed: {
    sum() {
      return this.price * this.model.quantity;
    },
    sumConfirm() {
      return this.price * this.quantity;
    },
    ...mapState({
      user: (state) => state.users.user,
    }),
  },
  async created() {
    await this.getUserByUser();
  },
  methods: {
    ...mapActions(["getUserByUser", "addOrder", "setConfirm", "deleteOrder"]),
    closeWindowOrder() {
      this.$emit("closed");
    },
    changeCounter: function (num) {
      this.model.quantity += +num;
      !isNaN(this.model.quantity) && this.model.quantity > 0
        ? this.model.quantity
        : (this.model.quantity = 1);
      this.model.quantity <= this.state
        ? this.model.quantity
        : (this.model.quantity = this.state);
    },
    async order() {
      await this.addOrder(this.model);
      this.$emit("save");
    },
    async changeConfrim() {
      if (this.orderId) {
        this.modelConfirm.confirm = true;
        await this.setConfirm(this.modelConfirm);
        this.$emit("save");
      }
    },
    async removeOrder() {
      await this.deleteOrder(this.orderId);
      this.$emit("save");
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
  width: 10rem;
  /* width: 100%; */
  height: 8rem;
}
.image > img {
  width: 100%;
  height: 100%;
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
.from-input {
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
  /* margin-left: auto; */
}
.btnOrder {
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
.product-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.wrapper {
  height: 30px;
  display: flex;
}
.quantityinput {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 30px;

  font-size: 16px;
  color: #43484d;
  font-weight: 300;
  border: 1px solid #e1e8ee;
}

.btn {
  border: 1px solid #e1e8ee;
  width: 30px;
  background-color: #e1e8ee;
  cursor: pointer;
}
</style>
