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
                  name="Product Name" v-validate="'required'"
                  placeholder="star"
                  data-vv-validate-on="blur"
                  v-model="model.product.name"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Product Name')">{{ errors.first('Product Name') }}</span>
        <vs-select v-validate="'included:1,3'" v-model="model.product.vendor" name="included" label="Category"
                   class="select-large mt-5 w-full">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in vendor"/>
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('included')">{{ errors.first('included') }}</span>
        <vs-select v-validate="'included:1,3'" v-model="model.product.vendor" name="included" label="Vendor"
                   class="select-large mt-5 w-full">
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in vendor"/>
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('included')">{{ errors.first('included') }}</span>
        <vs-input label="Selling Price"
                  name="Product Name" v-validate="'required'"
                  placeholder="star"
                  data-vv-validate-on="blur"
                  v-model="model.product.name"
                  class="mt-5 w-full"/>
        <vs-input label="Crate Price"
                  name="Product Name" v-validate="'required'"
                  placeholder="star"
                  data-vv-validate-on="blur"
                  v-model="model.product.name"
                  class="mt-5 w-full"/>
        <vs-input label="Quantity per Crate"
                  name="Product Name" v-validate="'required'"
                  placeholder="star"
                  data-vv-validate-on="blur"
                  v-model="model.product.name"
                  class="mt-5 w-full"/>
        <vs-input label="Optimum Quantity In Stock"
                  name="Product Name" v-validate="'required'"
                  placeholder="star"
                  data-vv-validate-on="blur"
                  v-model="model.product.name"
                  class="mt-5 w-full"/>
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

    export default {
        name: "ProductAdd",
        props: {
            isSidebarActive: {
                type: Boolean,
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
            vendor: [
                {text: "One", value: 1},
                {text: "Two", value: 2},
                {text: "Three", value: 3},
                {text: "Four", value: 4},
                {text: "Five", value: 5},
            ],
            settings:
                {
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                }
            ,
            model: {
                product: {
                    name: '',
                    created_on: Date(),
                    created_by: ''
                }
            }
            ,
        }),
        methods: {
            addProduct() {
                this.$validator.validateAll().then(result => {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: '#button-with-loading',
                            scale: 0.45
                        })
                        let data = [this.model.category];
                        if (result) {
                            getClient().callFunction('createCategory', data).then(
                                res => {
                                    this.$emit('newCategory');
                                    this.notify({text: 'Successfully Added New Category!', title: '', color: 'success'})
                                    this.model.category.name = '';
                                    this.isSidebarActiveLocal = false;
                                    this.$vs.loading.close('#button-with-loading > .con-vs-loading');

                                }
                            ).catch(
                                err => {
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
            }
            ,
        }
        ,
        mounted() {
            // this.model.category.created_by = this.$store.state.auth.activeUser

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

