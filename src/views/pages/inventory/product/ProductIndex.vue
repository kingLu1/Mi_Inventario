<template>
  <div>
    <component :is="activeComponent"
               :activeProduct="activeProduct"
               :search="search"
               :products="(keyword) ? newProducts : products"
               @backToTable="backToTable"
               @viewProductDetails="viewProductDetails"
               @openAddMultiplePage='openAddMultiplePage'/>
  </div>

</template>

<script>
  import Table from './Product';
  import Detail from './ProductDetail';
  import AddMultiple from './ProductAddMultiple';
  import eventBus from "../../../../eventBus";
  import {getClient} from "../../../../stitch/app";

  export default {
    name: "ProductIndex",
    components: {
      Table, Detail, AddMultiple
    },
    data: () => ({
      activeComponent: 'Table',
      activeProduct: null,
      products: [],
      keyword: false,
      newProducts: [],
      search: {
        category: 'all',
        vendor: 'allVendor',
        order: 1,
        searchBy: 'name'

      }
    }),
    methods: {
      openAddMultiplePage() {
        this.activeComponent = 'AddMultiple';
      },
      viewProductDetails(p) {
        this.activeProduct = p;
        this.activeComponent = "Detail"
      },
      backToTable() {
        this.activeComponent = "Table"
      },
      getProducts() {
        eventBus.$emit('loading', true);
        let data = [this.search];
        getClient().callFunction('FilterProduct', data).then((res) => {
          this.products = res;
          // console.log(res);
          eventBus.$emit('loading', false);
          eventBus.$emit('found', res.length)
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
          eventBus.$emit('found', false);
          eventBus.$emit('loading', false)

        });
      },
      quickGetProducts() {
        let data = [this.search];
        this.keyword = false;
        getClient().callFunction('FilterProduct', data).then((res) => {
          this.products = res;
          eventBus.$emit('found', res.length)
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
          eventBus.$emit('found', false)
        });

      },
      searchByName(keyword) {
        if (keyword === null) {
          /* eslint-disable */
        } else {
          (keyword) ? this.keyword = keyword : this.keyword = keyword;
          this.newProducts = [];
          this.products.filter(product => {
            (product.name.toLowerCase().includes(keyword.toLowerCase())) ? this.newProducts.push(product) : null
          })
        }
      },
      listener() {
        eventBus.$on('newProduct', () => this.getProducts());
        eventBus.$on('clearFilters', () => {
          this.search = {
            category: 'all',
            vendor: 'allVendor',
            order: 1,
            searchBy: 'name'
          };
          this.quickGetProducts()
        });
        eventBus.$on('searchDb', (x) => this.searchByName(x))
      }
    },
    mounted() {
      this.getProducts();
      this.listener();
    },
    watch: {
      order() {
        this.quickGetProducts();
      },
      vendor() {
        this.quickGetProducts();
      },
      category() {
        this.quickGetProducts();
      },
      searchBy() {
        this.quickGetProducts();
      }
    },
    computed: {
      order() {
        return this.search.order
      },
      vendor() {
        return this.search.vendor
      },
      category() {
        return this.search.category
      },
      searchBy() {
        return this.search.searchBy
      }
    }
  }
</script>

<style scoped>
</style>
