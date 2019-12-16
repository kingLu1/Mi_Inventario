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
        <div class="vx-col w-full">
          <div>
            <p class="mb-4">Name : {{activeVendor.name}} </p><span></span>
            <p class="mb-4">Contact Name : {{activeVendor.contact}} </p><span></span>
            <p class="mb-4">Contact Number : {{activeVendor.phone}} </p><span></span>
            <p class="mb-4">Total Number Of Products : <span class="text-primary bold"> {{products.length}}</span></p>
            <span></span>
            <p class="mb-4"> Created By : {{activeVendor.created_by}} </p><span></span>
            <p class="mb-4"> Created On : {{activeVendor.created_on}} </p><span></span>
            <p class="mb-4"> Last Updated By: {{activeVendor.last_update}}</p><span></span>
            <p class="mb-4"> Last Updated On: {{activeVendor.last_update_on}}</p><span></span>
          </div>

          <div v-if="showProducts">
            <vs-divider color="primary" position="center"><span class="text-primary">All Products</span></vs-divider>
            <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings">
              <div class="items-grid-view vx-row" v-if="products.length">
                <!--          <VuePerfectScrollbar class="scroll-area" :settings="settings">-->

                <div class="vx-col w-full sm:w-1/3 md:1/5 lg:w-1/6 xl:1/6 " v-for="product in products">
                  <vx-card class="grid-view-item mb-base overflow-hidden" noShadow cardBorder>
                    <template slot="no-body">
                      <div class="item-details px-4 pb-4">
                        <div class="my-4">
                          <!--                                    name-->
                          <h6 class="truncate font-semibold mb-1">
                            {{product.name}}
                          </h6>
                          <!--                                    category-->
                          <p class="item-description truncate text-sm">
                            {{product.category}}
                          </p>
                        </div>
                        <div class="flex justify-between items-center">
                          <div class="flex text-white py-1 px-2 rounded" :class="getHealth(product)">
                            <feather-icon icon="BarChart2Icon" svgClasses="h-4 w-4"/>
                          </div>
                          <!--                                    selling price-->
                          <h6 class="font-bold">
                            {{ product.selling_price | currency}}
                          </h6>
                        </div>
                      </div>
                    </template>
                  </vx-card>
                </div>

              </div>
              <!--              <div class=" vs-con-loading__container loading_height bg-white flex justify-center items-center"-->
              <!--                   id="div-with-loading" v-if="!products.length">-->
              <!--                <div v-if="!notFound" class="flex items-center">-->
              <!--                  <feather-icon icon="MehIcon" svgClasses="h-8 w-8"/>-->
              <!--                  <p class="font-semibold ml-2">No Product Found</p>-->

              <!--                </div>-->
              <!--              </div>-->
            </VuePerfectScrollbar>
          </div>
          <div class="flex">
            <vs-button
              v-if="!showProducts"
              color="success"
              class="mr-2 w-full" @click="showProducts=!showProducts">
              Show All Products
            </vs-button>
            <vs-button
              v-if="showProducts"
              color="danger"
              class="mr-2 w-full" @click="showProducts=!showProducts">
              Hide Products
            </vs-button>
            <vs-button
              color="dark"
              class="mr-2 w-full" @click="backToTable">
              Show Last Purchasing
            </vs-button>
          </div>

        </div>
      </div>
    </vx-card>
  </div>

</template>

<script>
  import {getClient} from '../../../../stitch/app';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: "DetailVendor",
    data: () => ({
      products: [],
      showProducts: false,
      settings: {
        // perfectScrollbar settings
        maxScrollbarLength: 10,
        wheelSpeed: .60,
      },
    }),
    props: {
      activeVendor: {
        required: true
      }
    },
    components: {
      VuePerfectScrollbar,
    },
    methods: {
      backToTable() {
        this.$emit("backToTable")
      },
      getProductTotal() {
        let data = [{"vendor": this.activeVendor.name}];
        console.log("data:", data)
        getClient().callFunction('VendorGetProducts', data).then(res => {
          this.products = res;
        }).catch(err => {
          console.log(err)
        })
      },
      getHealth(p) {
        let q = (p.qty_in_stock / p.qty_per_crate);
        if (q === 0) {
          return 'bg-dark'
        } else if (q <= p.worst_qty) {
          return 'bg-danger'
        } else if (q >= p.optimum_qty) {
          return 'bg-success'
        } else if (q > p.worst_qty) {
          return 'bg-warning'
        }
      },

    },
    created() {
      this.getProductTotal()
    }

  }
</script>

<style scoped>


  .scroll-area {
    position: relative;
    margin: auto;
    /*width: 400px;*/
    height: 30vh;
  }

</style>
