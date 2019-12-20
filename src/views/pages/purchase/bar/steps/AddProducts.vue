<template>
  <div class="p-base px-4 pt-2">
    <vs-divider  position="left-center">
      <h4 class="font-semibold">Buy Products</h4>
    </vs-divider>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div class="vx-row flex">
          <div class="vx-col w-1/2 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-2/3">
            <div class="mb-2">
              <p>Select Products<span class="text-danger ml-1">*</span></p>
            </div>
            <v-select label="name" name="Product" v-model="selectedProduct" v-validate="'required'" :options="products"
                      class="w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product')">{{ errors.first(' Product') }}</span>
          </div>
          <div class="vx-col actions w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3">
            <vs-button @click="addSelectedProductToPurchased" color="warning" type="filled" icon-pack="feather"
                       icon="icon-plus"
                       class="mr-2 round">
            </vs-button>
          </div>
        </div>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-2/3">
        <div class="mb-2">
          <p>Cart({{sortedPurchasedProducts.length}})</p>
        </div>
        <div class="vx-row" v-if="sortedPurchasedProducts.length">
          <div class="vx-col  w-1/5">
            <p class="font-bold ">Name</p>
          </div>
          <div class="vx-col  w-1/5">
            <p class="font-bold text-center">Crate Price</p>
          </div>
<!--          <div class="vx-col  w-1/6">-->
<!--            <p class="font-bold text-center">Quantity Per Crate</p>-->
<!--          </div>-->

          <div class="vx-col  w-1/5">
            <p class="font-bold text-center">Purchasing</p>
          </div>
          <div class="vx-col  w-1/5">
            <p class="font-bold text-center">Amount</p>
          </div>
          <div class="vx-col  w-1/5">
            <p class="font-bold text-center">Action</p>
          </div>
        </div>
        <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings" v-if="sortedPurchasedProducts.length">
          <div class="vx-row flex items-center" v-for="p in sortedPurchasedProducts">

            <div class="vx-col   w-1/5">
              <p>{{p.name | capitalize}}</p>
            </div>

            <div class="vx-col flex justify-center w-1/5">
              <p>{{p.crate_price | currency}}</p>
            </div>
<!--            <div class="vx-col flex justify-center w-1/6">-->
<!--              <p>{{p.qty_per_crate}}</p>-->
<!--            </div>-->
            <div class="vx-col  w-1/5">
              <p class="flex">
          <span class="centerx">
            <vs-input-number v-model="p.purchasing" color="dark" :label="totalQuantity(p)"/>
          </span>
              </p>
            </div>
            <div class="vx-col  flex justify-center w-1/5">
              <p class="money">{{p.crate_price * p.purchasing | currency}}</p>
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
    <div class="flex justify-end" v-if="sortedPurchasedProducts.length">
      <vs-button
        color="warning" type="filled"
        class="ml-2 " @click="next()">
        Next
      </vs-button>
    </div>
  </div>
</template>

<script>
  import {getProducts} from "../../../../../stitch/api/inventory";
  import vSelect from "vue-select";
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import eventBus from "../../../../../eventBus";

  export default {
    name: "AddProducts",
    data: () => ({
      products: [],
      selectedProduct: '',
      selectedPurchasedProducts: [],
      sortedPurchasedProducts: [],
      trash: [],

      settings: {maxScrollbarLength: 60, wheelSpeed: .60},
    }),
    created() {
      this.getProducts();
    },
    methods: {
      next() {
        eventBus.$emit('goToSummary', this.sortedPurchasedProducts)
      },
      getProducts() {
        this.axios.get(getProducts).then((res) => {
          this.products = res.data
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      addSelectedProductToPurchased() {
        this.$validator.validateAll().then(result => {
            if (result) {
              let product = this.selectedProduct;
              if (!this.checkIfInSelectedPurchasedProducts(product)) {
                this.selectedPurchasedProducts.unshift(product);
                this.selectedProduct = '';
                this.sortSoldProduct(product);
                this.removeFromProducts(product);
              } else {
                this.notify({
                  title: 'Warning',
                  text: 'Already in Cart',
                  color: 'warning'
                });
              }
            } else {
              // steps have errors
            }
          }
        ).catch(err => {
          console.log(err)
        })
      },
      checkIfInSelectedPurchasedProducts(selectedProduct) {
        // returns false if selected products is already in selectedPurchasedProducts Array
        let product = this.selectedPurchasedProducts.find(product => product.name === selectedProduct.name);
        return !!product;
      },
      sortSoldProduct(item) {
        this.sortedPurchasedProducts.push({
          id: item._id,
          name: item.name,
          vendor: item.vendor,
          qty_per_crate: item.qty_per_crate,
          crate_price: parseInt(item.crate_price, 10),
          purchasing: 0
        })
      },
      removeFromProducts(selectedProduct) {
        // remove product from all products after added
        let product = this.products.find(item => item.name === selectedProduct.name);
        this.products.splice((this.products.indexOf(product)), 1);
        this.sendToTrash(product)
      },
      remove(item) {
        this.selectedPurchasedProducts.splice(this.selectedPurchasedProducts.indexOf(item), 1);
        this.sortedPurchasedProducts.splice(this.sortedPurchasedProducts.indexOf(item), 1);
        this.recycle(item)
        // eventBus.$emit('re-evaluate')
      },
      sendToTrash(product) {
        this.trash.push(product)
      },
      recycle(p) {
        let product = this.trash.find(item => item.name === p.name);
        this.products.push(product)
      },
      totalQuantity(p) {
        return `Crate:(${p.qty_per_crate * p.purchasing})`
      }
    },
    components: {
      vSelect, VuePerfectScrollbar
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
