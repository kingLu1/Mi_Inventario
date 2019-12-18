<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <vx-card>
          <h4>Add Multiple Products</h4>
          <div>
            <vs-input label="Name"
                      name="Product Name"
                      v-validate="'required'"
                      placeholder="Product Name"
                      data-vv-validate-on="blur"
                      v-model="model.product.name"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product Name')">{{ errors.first('Product Name') }}</span>

            <vs-select v-validate="'required'" v-model="model.product.category" name="Product Category" label="Category"

                       class="select-large mt-5 w-full">
              <vs-select-item :value="c.name" :text="c.name" v-for="c in categories"/>
            </vs-select>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product Category')">{{ errors.first('Product Category') }}</span>

            <vs-select v-validate="'required'" v-model="model.product.vendor" name="Product Vendor" label="Vendor"

                       class="select-large mt-5 w-full">
              <vs-select-item :value="v.name" :text="v.name" v-for="v in vendors"/>
            </vs-select>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product Vendor')">{{ errors.first('Product Vendor') }}</span>

            <vs-input label="Selling Price(₦)"
                      name="Product Price"
                      v-validate="'required|numeric'"
                      placeholder="Selling Price"
                      data-vv-validate-on="blur"
                      v-model="model.product.selling_price"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product Price')">{{ errors.first('Product Price') }}</span>

            <vs-input label="Crate Price(₦)"
                      name="Product Crate Price"
                      v-validate="'required|numeric'"
                      placeholder="Crate Price"
                      data-vv-validate-on="blur"
                      v-model="model.product.crate_price"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Product Crate Price')">{{ errors.first('Product Crate Price') }}</span>

            <vs-input label="Quantity per Crate"
                      name="Crate Quantity"
                      v-validate="'required|numeric'"
                      data-vv-validate-on="blur"
                      placeholder="Quantity"
                      v-model="model.product.qty_per_crate"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Crate Quantity')">{{ errors.first('Crate Quantity') }}</span>

            <vs-input label="Optimum Quantity In Stock"
                      name="Optimum Quantity" v-validate="'required|numeric'"
                      placeholder="Crates"
                      data-vv-validate-on="blur"
                      v-model="model.product.optimum_qty"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Optimum Quantity')">{{ errors.first('Optimum Quantity') }}</span>
            <vs-input label="Worst Quantity In Stock"
                      name="Worst Quantity" v-validate="'required|numeric'"
                      placeholder="Crates"

                      data-vv-validate-on="blur"
                      v-model="model.product.worst_qty"
                      class="mt-5 w-full"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('Worst Quantity')">{{ errors.first('Worst Quantity') }}</span>

            <div class="flex mt-4">

              <vs-button icon-pack="feather" icon="icon-slash"
                         type="border"
                         color="danger"
                         class="mr-2 w-full" @click="clearFields">
                Clear
              </vs-button>
              <vs-button icon-pack="feather" icon="icon-plus"
                         color="primary"
                         type="border"
                         class="w-full" @click="addToCart">
                Add
              </vs-button>

            </div>

          </div>
        </vx-card>

      </div>
      <div class="vx-col p-0 w-full sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
        <vx-card>
          <div class="flex justify-between mb-6">
            <h4><span class="text-bold">Cart</span><span>({{cart.length}})</span></h4>
            <vx-tooltip text="Go Back" position="top" style="margin-top:-5px;">
              <vs-button icon-pack="feather" icon="icon-corner-up-left"
                         color="primary"
                         type="border"
                         class="mr-2" @click="backToTable">
                Back
              </vs-button>
            </vx-tooltip>
          </div>
          <div class="vx-row" v-if="cart.length">
            <div class="vx-col w-full">
              <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings">
                <div class="item-details rounded flex items-center justify-between mb-2" v-for="(c,index) in cart">
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Name</p>
                    <p>{{c.name | capitalize}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Category</p>
                    <p>{{c.category | capitalize}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Vendor</p>
                    <p>{{c.vendor | capitalize}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Selling Price</p>
                    <p class="money">{{c.selling_price | currency}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Crate Price</p>
                    <p class="money">{{c.crate_price | currency}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Crate Qty</p>
                    <p>{{c.qty_per_crate}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Optimum Qty</p>
                    <p>{{c.optimum_qty}}</p>
                  </div>
                  <div class="pl-2 flex flex-col items-center justify-center">
                    <p class="font-bold">Worst Qty</p>
                    <p>{{c.worst_qty}}</p>
                  </div>
                  <div class="flex items-center justify-center ">

                    <feather-icon icon="XIcon" class=" cursor-pointer mr-2"
                                  svgClasses="stroke-current text-danger h-7 w-7" @click="removeProduct(index)"/>
                  </div>
                </div>
              </VuePerfectScrollbar>
              <div class="flex mt-4">
                <vs-button icon-pack="feather" icon="icon-x"
                           color="danger"
                           ref="loadableButton" id="button-with-loading2"
                           class="w-full mr-2 vs-con-loading__container" @click="emptyCart">
                  Cancel
                </vs-button>
                <vs-button icon-pack="feather" icon="icon-check"
                           color="success"
                           ref="loadableButton" id="button-with-loading"
                           class="w-full vs-con-loading__container" @click="submitCart">
                  Submit
                </vs-button>

              </div>
            </div>
          </div>
          <div class="loading_height bg-gray flex justify-center items-center"
               v-if="!cart.length">
            <div class="flex items-center">
              <feather-icon icon="MehIcon" svgClasses="h-10 w-10"/>
              <p class="font-semibold ml-2">No Product in Cart</p>

            </div>
          </div>
        </vx-card>
      </div>
      <!--    </vx-card>-->
    </div>
  </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import {getClient} from '../../../../stitch/app'
  import {mapState} from 'vuex'
  import {getVendors, getCategory} from '../../../../stitch/api/inventory';


  export default {
    name: "ProductAddMultiple",
    props: {},
    components: {
      VuePerfectScrollbar
    },
    data: () => ({
      //Button Loading
      backgroundLoading: '#7367F0',
      colorLoading: 'white',
      //

      settings:
        {
          maxScrollbarLength: 60,
          wheelSpeed: .60,
        }
      ,
      model: {
        product: {},
        allProduct: {
          created_on: Date(),
          created_by: '',
          qty_in_stock: 0
        }
      },
      vendors: [],
      categories: [],
      cart: []
    }),
    methods: {

      backToTable() {
        this.$emit("backToTable")
      },
      clearFields() {
        this.model.product = {}
      },
      addToCart() {
        this.$validator.validateAll().then(result => {
            if (result) {
              let product = Object.assign(this.model.product, this.model.allProduct);
              if (!this.checkInCart(product)) {
                this.cart.unshift(product);
                this.clearFields()
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
      removeProduct(p) {
        this.cart.splice(p, 1);
      },
      checkInCart(p) {
        let product = this.cart.find(item => item.name === p.name);
        return !!product;

      },
      submitCart() {
        this.$vs.loading({
          background: this.backgroundLoading,
          color: this.colorLoading,
          container: '#button-with-loading',
          scale: 0.45
        })
        getClient().callFunction('ProductCreateMany', [this.cart]).then(
          res => {
            this.$vs.loading.close('#button-with-loading > .con-vs-loading');
            this.$emit('backToTable');
            this.notify({text: 'Successfully Added New Products!', title: '', color: 'success'})
          }
        ).catch(
          err => {
            this.$vs.loading.close('#button-with-loading > .con-vs-loading');
            this.notify({text: err.message, title: 'Error', color: 'danger'})
          }
        )
      },
      emptyCart() {
        this.cart = []
      },
      getVendors() {
        this.axios.get(getVendors).then((res) => {
          this.vendors = res.data;
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      }
      ,
      getCategories() {
        this.axios.get(getCategory).then((res) => {
          this.categories = res.data;
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      }
    },
    computed: {
      ...mapState(['AppActiveUser'])

    },
    watch: {},
    mounted() {
      this.model.allProduct.created_by = this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name

    },
    created() {
      this.getCategories();
      this.getVendors();
    }
  }
</script>

<style scoped>
  .item-details {
    border: 1px solid #9c9c9c;
    height: 60px;
  }

  .scroll-area {
    position: relative;
    margin: auto;
    /*width: 400px;*/
    height: 70vh;
  }

  .loading_height {
    height: 75vh;
  }
</style>
