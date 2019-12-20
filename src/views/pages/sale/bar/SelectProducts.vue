<template>
  <div class="vx-row flex ">
    <div class="vx-col w-full sm:w-full md:w-1/3 lg:w-1/3  xl:w-1/3 ">
      <div class="vx-row flex">
        <div class="vx-col w-1/2 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-2/3">
          <div class="mb-2">
            <p>Select Products<span class="text-danger ml-1">*</span></p>
          </div>
          <v-select label="name" name="Product" v-model="product" v-validate="'required'" :options="allProducts"
                    class="w-full"/>
          <span class="text-danger text-sm"
                v-show="errors.has('Product')">{{ errors.first(' Vendor') }}</span>
        </div>
        <div class="vx-col actions w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3">
          <vs-button @click="addProductToChips" color="warning" type="filled" icon-pack="feather" icon="icon-plus"
                     class="mr-2 round">
          </vs-button>
        </div>
      </div>
    </div>
    <div class="vx-col w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
      <div class="mb-2">
        <p>Cart({{chips.length}})</p>
      </div>
      <!--      <vs-chips color="rgb(145, 32, 159)" placeholder="No Products" v-model="chips"-->
      <!--                remove-icon="delete_forever">-->
      <!--        <vs-chip-->
      <!--          :key="chip.name"-->
      <!--          @click="remove(chip)"-->
      <!--          v-for="chip in chips"-->
      <!--          closable-->
      <!--          color="dark"-->
      <!--          close-icon="cancel">-->
      <!--          {{ chip.name | capitalize }}-->
      <!--        </vs-chip>-->
      <!--      </vs-chips>-->
      <div class="vx-row" v-if="soldProducts.length">
        <div class="vx-col  w-1/5">
          <p class="font-bold ">Name</p>
        </div>
        <div class="vx-col  w-1/5">
          <p class="font-bold text-center">Price</p>
        </div>
        <div class="vx-col  w-1/5">
          <p class="font-bold text-center">Sold</p>
        </div>
        <div class="vx-col  w-1/5">
          <p class="font-bold text-center">Amount</p>
        </div>
        <div class="vx-col  w-1/5">
          <p class="font-bold text-center">Action</p>
        </div>
      </div>
      <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings"  v-if="soldProducts.length">
        <div class="vx-row flex items-center" v-for="p in soldProducts">

          <div class="vx-col   w-1/5">
            <p>{{p.name | capitalize}}</p>
          </div>

          <div class="vx-col flex justify-center w-1/5">
            <p>{{p.selling_price | currency}}</p>
          </div>
          <div class="vx-col flex justify-center w-1/5">
            <p class="flex">
          <span class="centerx">
<!--            :label="totalQuantity(p)-->
            <vs-input-number v-model="p.sold" min="1" :max="p.inStock.$numberInt" color="dark "/>
          </span>
            </p>
          </div>
          <div class="vx-col  flex justify-center w-1/5">
            <p class="money">{{p.selling_price * p.sold | currency}}</p>
          </div>
          <div class="vx-col  flex justify-center w-1/5">
            <vs-button @click="remove(p)" size="small" color="danger" type="border" icon-pack="feather" icon="icon-x"
                       class="mr-2 round">
            </vs-button>
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>
  </div>

</template>

<script>
  import eventBus from "../../../../eventBus";
  import vSelect from "vue-select";
  import {getProducts} from '../../../../stitch/api/inventory';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'


  export default {
    name: "SelectProducts",
    props: {
      chips: {
        required: true
      },
      soldProducts: {
        required: true
      }
    },
    data: () => ({
      settings:
        {
          maxScrollbarLength: 60,
          wheelSpeed: .60,
        },
      product: '',
      allProducts: [],
      trash: [],

    }),
    components: {
      vSelect, VuePerfectScrollbar

    },
    methods: {
      addProductToChips() {
        this.$validator.validateAll().then(result => {
            if (result) {
              let product = this.product;
              if (!this.checkInChips(product)) {
                this.sortSoldProducts(product);
                this.chips.unshift(product);
                this.product = "";
                this.removeFromAllProducts(product);
              } else {
                this.notify({
                  title: 'Warning',
                  text: 'Already in Cart',
                  color: 'warning'
                });
              }
            } else {
              // form have errors
            }
          }
        ).catch(err => {
          console.log(err)
        })
      },
      remove(item) {
        this.chips.splice(this.chips.indexOf(item), 1);
        this.soldProducts.splice(this.soldProducts.indexOf(item), 1);
        this.recycle(item)
        eventBus.$emit('re-evaluate')
      },
      getProducts() {
        this.axios.get(getProducts).then((res) => {
          this.allProducts = res.data
          // console.log(res.data)
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      removeFromAllProducts(p) {
        let product = this.allProducts.find(item => item.name === p.name);
        this.allProducts.splice((this.allProducts.indexOf(product)), 1);
        this.sendToTrash(product)
      },
      sendToTrash(p) {
        this.trash.push(p)
      },
      recycle(p) {
        let product = this.trash.find(item => item.name === p.name);
        this.allProducts.push(product)
      },
      checkInChips(p) {
        let product = this.chips.find(item => item.name === p.name);
        return !!product;
      },
      sortSoldProducts(p) {
        this.soldProducts.push(
          {
            id: p._id,
            name: p.name,
            selling_price: parseInt(p.selling_price, 10),
            sold: 0,
            vendor: p.vendor,
            inStock: p.qty_in_stock
          }

        )
        console.log(this.soldProducts)
      }
    },
    created() {
      this.getProducts()
    }


  }
</script>

<style scoped>
  .actions {
    align-self: flex-end;
  }
  .scroll-area {
    position: relative;
    margin: auto;
    /*width: 400px;*/
    height: 50vh;
  }
</style>
