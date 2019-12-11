<template>
  <div id="table-loader" class="vs-con-loading__container">
    <vx-card>
      <vs-row>
        <vs-col>
          <div class="flex justify-end">
            <vx-tooltip text="Go Back" position="top">
              <vs-button icon-pack="feather" icon="icon-corner-up-left"
                         color="primary"
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
              <p class="mb-4 flex">Name :
                <span v-if="!visibility.isEdit">{{activeProduct.name}} </span>
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
              <p class="mb-4 flex">Category :
                <span v-if="!visibility.isEdit"> {{activeProduct.category}}</span>
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
              <p class="mb-4">Vendor : {{activeProduct.vendor}} </p>

            </div>

            <p class="mb-4">In Stock Quantity: {{activeProduct.qty_in_stock.$numberInt}} </p><span></span>
            <p class="mb-4">In Stock Crate(s):
              {{activeProduct.qty_in_stock.$numberInt/activeProduct.qty_per_crate}} </p><span></span>
            <p class="mb-4">Health : <span class=" inline text-white py-2 px-4 rounded"
                                           :class="{'bg-danger': healthLow, 'bg-success':healthHigh,'bg-warning':healthMedium,'bg-dark':healthZero}">
                      <feather-icon icon="BarChart2Icon" svgClasses="h-4 w-4"/>
          </span></p>
            <div class="flex">
              <p class="mb-4">Selling Price : <span class="money">{{activeProduct.selling_price | currency}}</span></p>
            </div>

            <p class="mb-4">Cost Price : <span class="money">{{activeProduct.crate_price / activeProduct.qty_per_crate | currency}}</span>
            </p><span></span>
            <p class="mb-4">Profit : <span class="money">{{activeProduct.selling_price - (activeProduct.crate_price / activeProduct.qty_per_crate)  | currency}}</span>
            </p><span></span>
            <div class="flex">
              <p class="mb-4">Crate Price : <span class="money">{{activeProduct.crate_price  | currency}}</span></p>
              svgClasses="stroke-current text-dark h-6 w-6"/></span>
            </div>
            <div class="flex">
              <p class="mb-4">Quantity Per Crate : {{ activeProduct.qty_per_crate }}
              </p>
            </div>

            <div class="flex">
              <p class="mb-4"> Optimum Quantity in Stock : {{activeProduct.optimum_qty}} </p>

            </div>
            <div class="flex">

              <p class="mb-4"> Worst Quantity in Stock : {{activeProduct.worst_qty}} </p>
            </div>
            <p class="mb-4"> Created By : {{activeProduct.created_by}} </p><span></span>
            <p class="mb-4"> Created On : {{activeProduct.created_on}} </p><span></span>
            <p class="mb-4"> Last Updated By: {{activeProduct.last_update}}</p><span></span>
            <p class="mb-4"> Last Updated On: {{activeProduct.last_updated_on}}</p><span></span>
          </div>
          <div class="flex">
            <vs-button
              v-if="!visibility.isEdit"
              color="warning"
              class="mr-2 w-full" @click="editProduct">
              Edit Product
            </vs-button>
            <vs-button
              v-if="visibility.isEdit"
              color="success"
              class="mr-2 w-full" @click="editProduct">
              Update Product
            </vs-button>
            <vs-button
              v-if="visibility.isEdit"
              color="warning"
              class="mr-2 w-full" @click="editProduct">
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

    export default {
        name: "ProductDetail",
        props: {
            activeProduct: {
                required: true
            }
        },
        data: () => ({
            healthLow: false,
            healthHigh: false,
            healthMedium: false,
            healthZero: false,
            visibility: {
                isEdit: false,
                activeEdit: false,

            }
        }),
        computed: {},
        mounted() {
            this.health()
        },
        methods: {
            health() {
                let q = (this.activeProduct.qty_in_stock.$numberInt / this.activeProduct.qty_per_crate);
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
                        this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                        this.backToTable()
                    }
                ).catch(
                    (err) => {
                        this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                        this.notify({text: err.message, title: 'Error', color: 'danger'});
                    }
                )
            },
            editProduct() {
                this.visibility.isEdit = !this.visibility.isEdit
            }
        }
    }
</script>

<style scoped>

</style>
