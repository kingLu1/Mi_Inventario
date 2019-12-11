<template>
  <vs-sidebar click-not-close position-right parent="body"
              color="primary"
              style=""
              class="items-no-padding add-new-data-sidebar"
              spacer
              v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Add Product</h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
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
      </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button @click="addProduct()" ref="loadableButton" id="button-with-loading"
                 class="mr-6 vs-con-loading__container"
      >Add
      </vs-button>
      <vs-button type="border" color="danger" @click.stop="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>


</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {getClient} from '../../../../stitch/app'
    import {mapState} from 'vuex'

    export default {
        name: "ProductAdd",
        props: {
            isSidebarActive: {
                type: Boolean,
                required: true
            },
            vendors: {
                required: true
            },
            categories: {
                required: true
            }
        },
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
                product: {
                    created_on: Date(),
                    created_by: '',
                    qty_in_stock: 0
                }
            }
            ,
        }),
        methods: {
            addProduct() {
                this.$validator.validateAll().then(result => {
                        if (result) {
                            this.$vs.loading({
                                background: this.backgroundLoading,
                                color: this.colorLoading,
                                container: '#button-with-loading',
                                scale: 0.45
                            })
                            let data = [this.model.product];
                            getClient().callFunction('ProductCreate', data).then(
                                res => {
                                    this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                                    this.$emit('newProduct');
                                    this.notify({text: 'Successfully Added New Product!', title: '', color: 'success'})
                                    this.model.product = {
                                        created_on: Date(),
                                        created_by: ''
                                    };
                                    this.isSidebarActiveLocal = false;


                                }
                            ).catch(
                                err => {
                                    this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                                    this.notify({text: err.message, title: 'Error', color: 'danger'})
                                }
                            )
                        } else {
                            // form have errors
                        }
                    }
                )
            }
        }
        ,
        computed: {
            isSidebarActiveLocal: {
                get() {
                    return this.isSidebarActive
                }
                ,
                set(val) {
                    if (!val) {
                        this.$emit('closeSidebar');
                    }
                }
            },
            ...mapState(['AppActiveUser'])

        },
        watch: {},
        mounted() {
            this.model.product.created_by = this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name

        }
    }
</script>

<style lang="scss">
  .add-new-data-sidebar {
    position: absolute;
    z-index: 60000;

    /deep/ .vs-sidebar--background {
      z-index: 52010;
    }

    .vs-sidebar {
      z-index: 52010;
      width: 400px !important;
      max-width: 90vw !important;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
  }

</style>

