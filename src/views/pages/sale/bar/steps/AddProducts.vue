<template>
  <div class="p-base px-4 pt-2">
    <vs-divider position="left-center">
      <h4 class="font-semibold">Add Sold Products</h4>
    </vs-divider>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5">
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
            <vs-button @click="addSelectedProductToSold" color="warning" type="filled" icon-pack="feather"
                       icon="icon-plus"
                       class="mr-2 round">
            </vs-button>
          </div>
        </div>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-3/5">
        <div class="mb-2">
          <p>Cart({{sortedSoldProducts.length}})</p>
        </div>
        <div class="vx-row" v-if="sortedSoldProducts.length">
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
        <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings" v-if="sortedSoldProducts.length">
          <div class="vx-row flex items-center" v-for="p in sortedSoldProducts">

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
            <number-input v-model="p.sold" :min="1" :max="returnNumber(p.inStock)" inline controls center size="small"/>
<!--            <vs-input-number v-model="p.sold" min="1" :max="p.inStock.$numberInt" color="dark "/>-->
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
    <div class="flex justify-end" v-if="sortedSoldProducts.length">
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
  import {getClient} from "../../../../../stitch/app";

  export default {
    name: "AddProducts",
    data: () => ({
      products: [],
      selectedProduct: '',
      selectedSoldProducts: [],
      sortedSoldProducts: [],
      trash: [],
      settings: {maxScrollbarLength: 60, wheelSpeed: .60},
    }),
    created() {
      this.getProducts();
    },
    methods: {
      next() {
        let sortedArray = this.sortedSoldProducts.map(item =>
          item.sold
        );
        let condition = sortedArray.reduce((x, y) => x + y);
        if (condition !== 0) {
          eventBus.$emit('goToSummary', this.sortedSoldProducts)
        } else {
          this.notify({
            title: 'Warning',
            text: "Sold Item is Zero",
            color: 'warning'
          })
        }

      },
      getProducts() {
        getClient().callFunction('ProductGet').then((res) => {
          this.products = res
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      addSelectedProductToSold() {
        this.$validator.validateAll().then(result => {
            if (result) {
              let product = this.selectedProduct;
              if (!this.checkIfInSelectedSoldProducts(product)) {
                this.selectedSoldProducts.unshift(product);
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
          // console.log(err)
        })
      },
      checkIfInSelectedSoldProducts(selectedProduct) {
        // returns false if selected products is already in selectedSoldProducts Array
        let product = this.selectedSoldProducts.find(product => product.name === selectedProduct.name);
        return !!product;
      },
      sortSoldProduct(p) {
        this.sortedSoldProducts.push({
          id: p._id,
          name: p.name,
          selling_price: parseInt(p.selling_price, 10),
          sold: 0,
          vendor: p.vendor,
          inStock: p.qty_in_stock
        })
      },
      removeFromProducts(selectedProduct) {
        // remove product from all products after added
        let product = this.products.find(item => item.name === selectedProduct.name);
        this.products.splice((this.products.indexOf(product)), 1);
        this.sendToTrash(product)
      },
      remove(item) {
        this.selectedSoldProducts.splice(this.selectedSoldProducts.indexOf(item), 1);
        this.sortedSoldProducts.splice(this.sortedSoldProducts.indexOf(item), 1);
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
      returnNumber(r){
        return parseInt(r,10)
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
