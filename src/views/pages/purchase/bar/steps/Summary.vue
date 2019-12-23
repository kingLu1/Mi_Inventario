<template>
  <div class="p-base px-4 pt-2">
    <vs-divider position="left-center">
      <h4 class="font-semibold">Purchase Summary</h4>
    </vs-divider>
    <vs-list>
      <div v-for="p in products" v-if="p.purchasing.length">
        <vs-list-header :title="p.vendor | capitalize"
                        color="dark"/>
        <div v-for="ps in p.purchasing">
          <vs-list-item icon-pack="feather"
                        icon="icon-check"
                        :title="ps.name | capitalize"
                        :subtitle="returnSubtitle(ps)"/>
        </div>
      </div>
      <div class="mt-2 mb-5">
        <div class="flex justify-end mb-2" v-for="p in products" v-if="p.purchasing.length">
          <h6>{{p.vendor | capitalize}} Total : {{getVendorTotal(p.purchasing ) | currency}} </h6>
        </div>
        <div class="flex justify-end">
          <h5>
            Total:
            <span class="money">{{total | currency}}</span>
          </h5>
        </div>

      </div>

    </vs-list>
    <div class="flex justify-between">
      <vs-button
        color="warning" type="filled"
        class="ml-2 " @click="back()">
        Back
      </vs-button>
      <vs-button
        color="warning" type="filled"
        class="ml-2 " @click="next">
        Next
      </vs-button>
    </div>
  </div>

</template>

<script>

  import eventBus from "../../../../../eventBus";
  import {getVendors} from "../../../../../stitch/api/inventory";


  export default {
    name: "Summary",
    props: {
      purchasedProducts: {
        required: true
      }
    },
    components: {},
    data: () => ({
      vendors: [], products: [], total: 0
    }),
    created() {
      this.getVendors()
    },
    methods: {
      back() {
        eventBus.$emit('goToAddProducts')
      },
      next() {
        eventBus.$emit('goToSubmit',
          {
            purchasing: this.purchasedProducts.map(item => {
              return {
                id: item.id,
                purchase: item.qty_per_crate * item.purchasing
              }
            }),
            total: this.total,
            purchasedProducts: this.products
          })
      },
      getVendors() {
        this.axios.get(getVendors).then((res) => {
          this.vendors = res.data
          // this.sortVendorProducts()
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      sortVendorProducts() {
        this.purchasedProducts.forEach(items => {
          let ind;
          let product = this.products.find((item, index) => {
              if (item.vendor === items.vendor) {
                ind = index;
                return true
              }
            }
          );
          // if (product) {
          // if (!this.checkInChips(items, ind)) {
          this.products[ind].purchasing.push(items);
          // }

          // }
        })
      },
      returnSubtitle(ps) {
        return `${ps.purchasing} Crate(s)(${ps.qty_per_crate * ps.purchasing} items) cost ‎₦${ps.purchasing * ps.crate_price}`
      },
      getVendorTotal(p) {
        let sortedArray = p.map(item =>
          item.crate_price * item.purchasing
        )
        this.getTotal()
        return sortedArray.reduce((x, y) => x + y)

      },
      getTotal() {
        let sorted = this.purchasedProducts.map(item =>
          item.crate_price * item.purchasing
        );
        this.total = sorted.reduce((x, y) => x + y)
      },

    },
    watch: {
      vendors() {
        this.products = this.vendors.map(item => {
            return {
              id: item._id,
              vendor: item.name,
              purchasing: []
            }
          }
        );
      },
      products() {
        this.sortVendorProducts()
      }
    },
  }
</script>

<style scoped>

</style>
