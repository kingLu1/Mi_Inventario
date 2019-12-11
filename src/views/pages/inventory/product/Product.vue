<template>
  <vs-row vs-w="12">
    <vs-row>
      <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
        <add :isSidebarActive="showAddProductComponent"
             @closeSidebar="showAddProductComponent= false"
             @newProduct="newProduct"
             :categories="categories"
             :vendors="vendors"
             class=" sidebarX"/>
      </vs-col>

    </vs-row>
    <vs-row vs-w="12" class="mb-4">
      <vs-col vs-lg="3" vs-sm="3" vs-xs="0" class="p-0 flex items-end">
        <p class=" lg:inline-flex  hidden font-semibold">Filters</p>
      </vs-col>
      <vs-col vs-lg="9" vs-sm="9" vs-xs="12" class="flex justify-end p-0">
        <vs-button color="primary" class="mr-2" type="border" @click="showAddProductComponent = true"
                   icon-pack="feather" icon="icon-plus">Add
        </vs-button>
        <vs-button color="primary" type="border" @click="goToAddMultiplePage" icon-pack="feather"
                   icon="icon-folder-plus">Add
          Multiple
        </vs-button>
      </vs-col>
    </vs-row>
    <vs-col vs-lg="3" vs-sm="3" vs-xs="0" class="p-0">
      <vx-card>
        <h6 class="font-bold mb-4">Search by</h6>
        <ul class="centerx mb-2 pl-4">
          <li class="px-2 py-2">
            <vs-radio v-model="search" vs-value="name">Name</vs-radio>
          </li>
          <li class="px-2">
            <vs-radio v-model="search" vs-value="carols">Price</vs-radio>
          </li>
        </ul>

        <h6 class="font-bold mb-2">Order</h6>
        <ul class="centerx mb-2 pl-4">
          <li class="px-2 py-2">
            <vs-radio v-model="order" vs-value="ascending">Ascending</vs-radio>
          </li>
          <li class="px-2">
            <vs-radio v-model="order" vs-value="carols">Descending</vs-radio>
          </li>
        </ul>
        <h6 class="font-bold mb-2">Category</h6>
        <ul class="centerx mb-2 pl-4">
          <li class="px-2 py-2">
            <vs-radio v-model="category" vs-value="all">All</vs-radio>
          </li>
          <li class="px-2 py-2" v-for="c in categories">
            <vs-radio v-model="category" :vs-value="c.name">{{c.name}}</vs-radio>
          </li>
        </ul>
        <h6 class="font-bold mb-2">Vendor</h6>
        <ul class="centerx mb-2 pl-4">
          <li class="px-2 py-2" v-for="v in vendors">
            <vs-checkbox v-model="vendor" :vs-value="v.name">{{v.name}}</vs-checkbox>
          </li>
        </ul>
        <vs-button class="w-full">CLEAR ALL FILTERS</vs-button>
      </vx-card>
    </vs-col>
    <vs-col vs-lg="9" vs-sm="9" vs-xs="12" class="p-0 pl-5">
      <div>
        <div class="relative mb-5">

          <!-- SEARCH INPUT -->
          <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg"
                    placeholder="Search Products by Name" size="large" v-model="keyword" @keyup.enter="searchDb"
                    @keyup.esc="clearSearch"
                    @input="showIcon"
          />

          <!-- SEARCH ICON -->
          <!--          <div slot="submit-icon" class="absolute pin-t pin-r py-4 px-6" v-show="!isTyping">-->
          <!--            <feather-icon icon="SearchIcon" svgClasses="h-6 w-6"/>-->
          <!--          </div>-->

          <!--          &lt;!&ndash; CLEAR INPUT ICON &ndash;&gt;-->
          <!--          <div slot="reset-icon" class="absolute pin-t pin-r py-4 px-6" v-show="isTyping"-->
          <!--               @click.prevent="clearSearch">-->
          <!--            <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer"/>-->
          <!--          </div>-->
        </div>
      </div>
      <VuePerfectScrollbar class="scroll-area pr-2" :settings="settings">
        <div class="items-grid-view vx-row match-height" v-if="products.length">
          <!--          <VuePerfectScrollbar class="scroll-area" :settings="settings">-->

          <div class="vx-col w-full sm:w-1/2 md:1/4 lg:w-1/4 xl:1/5 " v-for="product in products">
            <vx-card class="grid-view-item mb-base overflow-hidden">
              <template slot="no-body">
                <div class="item-details px-4">
                  <div class="my-4">
                    <!--                                    name-->
                    <h6 class="truncate font-semibold mb-1">
                      {{product.name}}
                    </h6>
                    <!--                                    category-->
                    <p class="item-description truncate text-sm">
                      {{product.vendor}}
                    </p>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="bg-primary flex text-white py-1 px-2 rounded" :class="getHealth(product)">
                      <feather-icon icon="BarChart2Icon" svgClasses="h-4 w-4"/>
                    </div>
                    <!--                                    selling price-->
                    <h6 class="font-bold">
                      {{ product.selling_price | currency}}
                    </h6>
                  </div>
                </div>

                <div class="flex mt-3">
                  <div
                    @click="viewProduct(product)"
                    class="item-view-secondary-action-btn p-3 flex flex-grow items-center justify-center text-primary cursor-pointer actions">
                    <feather-icon icon="EyeIcon" svgClasses="h-4 w-4"/>
                    <span class="text-sm font-semibold ml-2">VIEW</span>
                  </div>
                </div>
              </template>
            </vx-card>
          </div>

        </div>
        <div class=" vs-con-loading__container loading_height bg-white flex justify-center items-center"
             id="div-with-loading" v-if="!products.length">
          <div v-if="!notFound" class="flex items-center">
            <feather-icon icon="MehIcon" svgClasses="h-8 w-8"/>
            <p class="font-semibold ml-2">No Product Found</p>

          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-col>
  </vs-row>
</template>

<script>
    import {getProducts, getVendors, getCategory} from '../../../../stitch/api/inventory';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import add from './ProductAdd'


    export default {
        name: "Products",
        components: {
            VuePerfectScrollbar,
            add
        }
        ,
        data() {
            return {
                products: [],
                keyword: '',
                isTyping: false,
                notFound: true,
                settings: {
                    // perfectScrollbar settings
                    maxScrollbarLength: 30,
                    wheelSpeed: .60,
                },
                // add
                showAddProductComponent: false,
                //order
                order: 'ascending',
                //vendor
                vendors: [],
                vendor: [],
                //category
                category: 'all',
                categories: [],
                //search by
                search: 'name'
            };
        },
        methods: {
            getProducts() {
                this.$vs.loading({
                    container: '#div-with-loading',
                    type: 'sound',
                    scale: 1
                });
                this.axios.get(getProducts).then((res) => {
                    console.log(res.data);
                    this.products = res.data;
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading');
                    this.notFound = res.data.length
                }).catch((err) => {
                    this.$vs.notify({
                        time: 2500,
                        title: 'Error',
                        text: err.message,
                        position: 'top-right',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                    console.log(err.message);
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                    this.notFound = false

                });
            },
            newProduct() {
                this.axios.get(getProducts).then((res) => {
                    this.products = res.data;
                }).catch((err) => {
                    this.notify({
                        title: 'Error',
                        text: err.message,
                        color: 'danger'
                    })
                });
            },
            getHealth(p) {
                let q = (p.qty_in_stock.$numberInt / p.qty_per_crate);
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
            searchDb() {

            },
            showIcon() {
                this.isTyping = this.keyword !== '';
            },
            clearSearch() {
                this.keyword = '';
                this.showIcon()
            },
            goToAddMultiplePage() {
                this.$emit('openAddMultiplePage');
            },

            viewProduct(p) {
                this.$emit('viewProductDetails', p)
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
            ,

        },
        created() {


        },
        mounted() {
            this.getProducts();
            this.getCategories();
            this.getVendors();

        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
  .loading_height {
    height: 50vh;
  }

  .grid-view-item {
    .grid-view-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      transition: .35s;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 25px 0 rgba(0, 0, 0, .25);

      .grid-view-img {
        opacity: 0.9;
      }
    }

    .actions:hover {
      background-color: #7367F0;
      /*color: #fff;*/
    }

    .actions:hover * {
      color: #fff;
    }
  }

  .scroll-area {
    position: relative;
    margin: auto;
    /*width: 400px;*/
    height: 90vh;
  }
</style>
