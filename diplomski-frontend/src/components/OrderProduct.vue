<template>
  <ValidationObserver ref="observer">
    <div>
      <div class="cls">
        <div class="title">
          {{ name }}
        </div>
        <div class="close-button" @click="closeWindowOrder()">X</div>
      </div>
      <div class="order-div">
        <div class="oreder-product">
          <div class="image">
            <img :src="'http://localhost:5000/Images/' + images[0]" alt="" />
          </div>
          <div class="product-information">
            <div class="text">
              <b>Cijena:</b>
              <div style="color: red; font-weight: bold">{{ price }}KM</div>
            </div>

            <div class="text" v-if="forConfirm">
              <b>Količina:</b> {{ quantity }}
            </div>
            <div class="text" v-if="forConfirm">
              <b>Ukupna cijena:</b>
              <div style="color: red; font-weight: bold">
                {{ sumConfirm }}KM
              </div>
            </div>
          </div>
          <div class="product-information" v-if="forConfirm"></div>

          <div class="quantity" v-if="forOrder">
            <div style="padding: 0.5rem 0"><b>Izaberite kolicinu</b></div>
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
              <b style="display: flex"
                >Lični podaci &nbsp;
                <div v-if="forConfirm">o kupcu:</div></b
              >
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
              <ValidationProvider
                name="telephone"
                rules="required"
                v-slot="{ errors }"
              >
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
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>

            <div>
              <div class="form-text">Adresa*</div>
              <ValidationProvider
                name="address"
                rules="required"
                v-slot="{ errors }"
              >
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
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>

            <div v-if="forOrder">
              <div style="align-items: start" class="form-text">
                Napomena<br />(nije obavezno)
              </div>
              <textarea
                v-model="model.buyerNote"
                :disabled="forConfirm ? true : false"
                name="Text1"
                rows="3"
                class="from-input"
              ></textarea>
            </div>
            <div v-if="forConfirm && buyerNote != '' && buyerNote != null">
              <div style="align-items: start" class="form-text">
                Napomena<br />
              </div>
              <textarea
                v-model="buyerNote"
                :disabled="forConfirm ? true : false"
                name="Text1"
                rows="3"
                class="from-input"
              ></textarea>
            </div>
            <div v-if="forConfirm && remove">
              <div style="align-items: start" class="form-text">
                Unesite napomenu<br />(nije obavezno)
              </div>
              <textarea
                v-model="modelRefuse.sellerNote"
                name="Text1"
                rows="3"
                class="from-input"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="sum-order" v-if="forOrder">
          <div class="sum">
            <div class="text">
              <b>Ukupno:</b>
              <div style="color: red; font-weight: bold">{{ sum }}KM</div>
            </div>
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
  </ValidationObserver>
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
    noteBuyer: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      nameUser: this.userName,
      surnameUser: this.userSurname,
      telephoneUser: this.userTelephone,
      addressUser: this.userAddress,
      buyerNote: this.noteBuyer,
      model: {
        productId: Number(this.$route.query.productId),
        confirm: false,
        telephone: "",
        address: "",
        quantity: 1,
        buyerNote: "",
      },
      modelConfirm: {
        idOrder: this.orderId,
        confirm: false,
      },
      modelRefuse: {
        sellerNote: "",
        idOrder: this.orderId,
      },
      showError: false,
      remove: false,
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
    ...mapActions(["getUserByUser", "addOrder", "setConfirm", "refuseOrder"]),
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
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!valid) return;

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
      if (this.remove == true) {
        await this.refuseOrder(this.modelRefuse);

        this.$emit("save");
      }
      this.remove = true;
    },
  },
};
</script>

<style scoped>
.cls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cls > .close-button {
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
.close-button:hover {
  background: #c40404;
}
.cls > .title {
  padding: 0 1rem;
  font-weight: 700;
  font-size: 1.3rem;
}

.order-div {
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
}
.oreder-product {
  display: flex;
  padding: 00.2rem;
  margin-bottom: 1rem;
}
.image {
  width: 10rem;

  height: 8rem;
}
.image > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.text {
  padding: 0 1rem;
  font-size: 1rem;
  display: flex;
}
.quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  padding: 1rem;
  font-size: 1rem;
  align-items: center;
}
.user-div {
  display: flex;
  padding: 1rem 1rem;
  padding-bottom: 0;
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
  text-align: start;
}
.form-text {
  width: 7rem;
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
  padding-top: 0.3rem;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 0.3rem;
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
}
.btnOrder {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);

  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border: none;
}
.btnOrder:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
.product-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
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
b {
  margin-right: 0.5rem;
}
.wrapper > button:hover {
  background-color: #b5babf;
}
.error {
  margin: auto;
  padding: 0.2rem;
  text-align: left;
  color: red;
  background: transparent;
}
</style>
