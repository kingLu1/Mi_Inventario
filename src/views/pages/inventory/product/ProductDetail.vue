<template>
  <div id="table-loader" class="vs-con-loading__container">
    <vx-card>
      <vs-row>
        <vs-col>
          <div class="flex justify-end">
            <vx-tooltip text="Go Back" position="top">
              <vs-button icon-pack="feather" icon="icon-corner-up-left"
                         color="primary"
                         type="border"
                         class="mr-2" @click="backToTable">
                Back
              </vs-button>
            </vx-tooltip>
          </div>
        </vs-col>
      </vs-row>
      <div class="vx-row">
        <div class="vx-col w-full sm: md: lg:offset-2 xl:">
          <div>
            <div class="flex">
              <p class="mb-4 flex">Name : <span class="pl-2" v-if="!visibility.isEdit">{{activeProduct.name | capitalize}} </span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Product Name"
                    v-validate="'required'"
                    placeholder="Product Name"
                    data-vv-validate-on="blur"
                    v-model="activeProduct.name"
                    class="w-full -mt-2 ml-2"/>
                  <span class="text-danger text-sm" v-show="errors.has('Product Name')">{{ errors.first('Product Name') }}</span></span>
              </p>

            </div>

            <div class="flex">
              <p class="mb-4 flex">Category : <span class="pl-2" v-if="!visibility.isEdit"> {{activeProduct.category | capitalize}}</span>
                <span v-if="visibility.isEdit">
                  <vs-select v-validate="'required'" v-model="activeProduct.category" name="Product Category"
                             class="select-large ml-2 -mt-2  w-full">
                  <vs-select-item :value="c.name" :text="c.name" v-for="c in categories"/>
        </vs-select>
        <span class="text-danger text-sm"
              v-show="errors.has('Product Category')">{{ errors.first('Product Category') }}</span>
                </span>

              </p>
            </div>
            <div class="flex">
              <p class="mb-4 flex">Vendor : <span class="pl-2" v-if="!visibility.isEdit">   {{activeProduct.vendor| capitalize}}</span>
                <span v-if="visibility.isEdit">
                 <vs-select v-validate="'required'" v-model="activeProduct.vendor" name="Product Vendor"

                            class="select-large ml-2 -mt-2 w-full">
          <vs-select-item :value="v.name" :text="v.name" v-for="v in vendors"/>
        </vs-select>
        <span class="text-danger text-sm"
              v-show="errors.has('Product Vendor')">{{ errors.first('Product Vendor') }}</span>
                </span>
              </p>

            </div>


            <p class="mb-4">Health : <span class=" inline text-white py-2 px-4 rounded"
                                           :class="{'bg-danger': healthLow, 'bg-success':healthHigh,'bg-warning':healthMedium,'bg-dark':healthZero}">
                      <feather-icon icon="BarChart2Icon" svgClasses="h-4 w-4"/>
          </span></p>
            <div class="flex">
              <p class="mb-4 flex">Selling Price :
                <span class="money pl-2" v-if="!visibility.isEdit">{{activeProduct.selling_price | currency}}</span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Product Price"
                    v-validate="'required|numeric'"
                    placeholder="Selling Price"
                    data-vv-validate-on="blur"
                    v-model="activeProduct.selling_price"
                    class="-mt-2 ml-2 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Product Price')">{{ errors.first('Product Price') }}</span>
                </span>
              </p>
            </div>

            <p class="mb-4">Cost Price : <span class="money">{{activeProduct.crate_price / activeProduct.qty_per_crate | currency}}</span>
            </p><span></span>
            <p class="mb-4">Profit : <span class="money">{{activeProduct.selling_price - (activeProduct.crate_price / activeProduct.qty_per_crate)  | currency}}</span>
            </p><span></span>
            <div class="flex">
              <p class="mb-4 flex">Crate Price :
                <span v-if="!visibility.isEdit" class="money pl-2">{{activeProduct.crate_price  | currency}}</span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Product Crate Price"
                    v-validate="'required|numeric'"
                    placeholder="Crate Price"
                    data-vv-validate-on="blur"
                    v-model="activeProduct.crate_price"
                    class="-mt-2 ml-2 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Product Crate Price')">{{ errors.first('Product Crate Price') }}</span>
                </span>
              </p>
            </div>
            <p class="mb-4">In Stock Quantity: <span class="text-primary">{{activeProduct.qty_in_stock}} item(s) / {{parseFloat((activeProduct.qty_in_stock/activeProduct.qty_per_crate).toFixed(1) )}} crate(s)</span>
            </p>
            <div class="flex">
              <p class="mb-4 flex">Quantity Per Crate :
                <span v-if="!visibility.isEdit" class="pl-1">  {{ activeProduct.qty_per_crate }} item(s)</span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Crate Quantity"
                    v-validate="'required|numeric'"
                    data-vv-validate-on="blur"
                    placeholder="Quantity"
                    v-model="activeProduct.qty_per_crate"
                    class="ml-2 -mt-2 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Crate Quantity')">{{ errors.first('Crate Quantity') }}</span>
                </span>

              </p>
            </div>

            <div class="flex">
              <p class="mb-4 flex"> Optimum Quantity in Stock : <span v-if="!visibility.isEdit" class="pl-1"> {{activeProduct.optimum_qty}} crate(s)</span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Optimum Quantity" v-validate="'required|numeric'"
                    placeholder="Crates"
                    data-vv-validate-on="blur"
                    v-model="activeProduct.optimum_qty"
                    class="-mt-2 ml-2 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Optimum Quantity')">{{ errors.first('Optimum Quantity') }}</span>
                </span>
              </p>

            </div>
            <div class="flex">
              <p class="mb-4 flex"> Worst Quantity in Stock : <span v-if="!visibility.isEdit" class="pl-1"> {{ activeProduct.worst_qty}} crate(s)</span>
                <span v-if="visibility.isEdit">
                  <vs-input
                    name="Worst Quantity" v-validate="'required|numeric'"
                    placeholder="Crates"
                    data-vv-validate-on="blur"
                    v-model="activeProduct.worst_qty"
                    class="-mt-2 ml-2 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Worst Quantity')">{{ errors.first('Worst Quantity') }}</span>
                </span>
              </p>
            </div>
            <p class="mb-4"> Created By : {{activeProduct.created_by}} </p><span></span>
            <p class="mb-4"> Created On : {{activeProduct.created_on}} </p><span></span>
            <p class="mb-4"> Last Updated By : {{activeProduct.last_update}}</p><span></span>
            <p class="mb-4"> Last Updated On : {{activeProduct.last_update_on}}</p><span></span>
          </div>
          <div class="flex">
            <vs-button
              type="border"
              v-if="!visibility.isEdit"
              color="warning"
              class="mr-2 w-full" @click="editProduct">
              Edit Product
            </vs-button>
            <vs-button
              v-if="visibility.isEdit"
              color="success"
              ref="loadableButton" id="button-with-loading"
              class="mr-2 w-full  vs-con-loading__container" @click="updateProduct">
              Update Product
            </vs-button>
            <vs-button
              v-if="visibility.isEdit"
              color="warning"
              class="mr-2 w-full" @click="cancelProductEdit">
              Cancel
            </vs-button>
            <vs-button
              color="danger"
              class="mr-2 w-full" @click="openDeleteBox">
              Delete Product
            </vs-button>
          </div>

        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
  import {getClient} from '../../../../stitch/app';
  import {mapState} from 'vuex'
  import {getVendors, getCategory} from '../../../../stitch/api/inventory';

  export default {
    name: "ProductDetail",
    props: {
      activeProduct: {
        required: true
      }
    },
    data: () => ({
      //Button Loading
      backgroundLoadingSuccess: '#28C76F',
      colorLoading: 'white',
      //
      healthLow: false,
      healthHigh: false,
      healthMedium: false,
      healthZero: false,
      visibility: {
        isEdit: false,
        activeEdit: false,
      },
      vendors: [],
      categories: []
    }),
    computed: {
      ...mapState(['AppActiveUser'])
    },
    mounted() {
      this.health()
    },
    methods: {
      health() {
        let q = (this.activeProduct.qty_in_stock / this.activeProduct.qty_per_crate);
        if (q === 0) {
          this.healthZero = true
        } else if (q <= this.activeProduct.worst_qty) {
          this.healthLow = true
        } else if (q >= this.activeProduct.optimum_qty) {
          this.healthHigh = true
        } else if (q > this.activeProduct.worst_qty) {
          this.healthMedium = true
        }
      },
      backToTable() {
        this.$emit("backToTable")
      },
      openDeleteBox() {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Confirm`,
          text: `Are you sure  you want to delete ${this.activeProduct.name} product?`,
          accept: this.acceptDelete
        });
      },
      acceptDelete() {
        let data = [{name: this.activeProduct.name}];
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        getClient().callFunction('ProductDelete', data).then(() => {
            this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
            // this.$vs.loading.close('#button-with-loading > .con-vs-loading');
            this.backToTable()
          }
        ).catch(
          (err) => {
            // this.$vs.loading.close('#button-with-loading > .con-vs-loading');
            this.notify({text: err.message, title: 'Error', color: 'danger'});
          }
        )
      },
      editProduct() {
        this.visibility.isEdit = !this.visibility.isEdit
      },
      cancelProductEdit() {
        this.visibility.isEdit = !this.visibility.isEdit
      },
      updateProduct() {
        this.$validator.validateAll().then(result => {
          let update = {
            last_update: this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name,
            last_update_on: Date()
          }

          let editedProduct = Object.assign(update, this.activeProduct);

          this.$vs.loading({
            background: this.backgroundLoadingSuccess,
            color: this.colorLoading,
            container: '#button-with-loading',
            scale: 0.45
          });
          let data = [editedProduct];
          if (result) {
            getClient().callFunction('ProductEdit', data).then(
              res => {
                this.editProduct()
                this.notify({
                  text: 'Successfully Edited Product!',
                  title: '',
                  color: 'success'
                });
                this.$vs.loading.close('#button-with-loading > .con-vs-loading');

              }
            ).catch(
              err => {
                this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                this.notify({text: err.message, title: 'Error', color: 'danger'})
              }
            )
          } else {
            // steps have errors
          }
        })
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
    created() {
      this.getVendors();
      this.getCategories();
    }
  }
</script>

<style scoped>

</style>
