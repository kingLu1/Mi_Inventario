<template>
  <vs-list>
    <div v-for="p in products" v-if="p.purchasing.length">
      <vs-list-header :title="p.vendor | capitalize" color="dark"/>
      <div v-for="ps in p.purchasing">
        <vs-list-item icon-pack="feather" icon="icon-check" :title="ps.name | capitalize"
                      :subtitle="returnSubtitle(ps)"/>
      </div>
      <!--      <div class="flex justify-center mt-2">-->
      <!--        <h5>{{p.vendor | capitalize}} Total : {{getVendorTotal(p.purchasing ) | currency}} </h5>-->
      <!--      </div>-->

    </div>
    <div class="mt-2">
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
</template>

<script>
  import eventBus from "../../../../eventBus";
  import {getVendors} from '../../../../stitch/api/inventory';
  import {getClient} from '../../../../stitch/app'


  export default {
    name: "Submit",
    data: () => ({
      vendors: [],
      products: [],
      trimProducts: [],
      total: 0
    }),
    methods: {
      listeners() {
        // receive from selectQuantity Component
        eventBus.$on('trimProducts', (payload) => {
          this.trimProducts = payload
        });
        eventBus.$on('submit', () => {
          this.purchaseToDB()
        });
        eventBus.$on('changeTrimProducts', (payload) => {
          this.trimProducts = payload;
          this.products = this.vendors.map(item => {
              return {
                id: item._id,
                vendor: item.name,
                purchasing: []
              }
            }
          );
        })
      },
      getVendors() {
        this.axios.get(getVendors).then((res) => {
          this.vendors = res.data
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      sortVendorProducts() {
        this.trimProducts.forEach(items => {
          let ind;
          let product = this.products.find((item, index) => {
              if (item.vendor === items.vendor) {
                ind = index;
                return true
              }
            }
          );
          if (product) {
            if (!this.checkInChips(items, ind)) {
              this.products[ind].purchasing.push(items);
            }

          }
        })
      },
      checkInChips(p, ind) {
        let product = this.products[ind].purchasing.find(item => item.name === p.name);
        return !!product;
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
        let sorted = this.trimProducts.map(item =>
          item.crate_price * item.purchasing
        )
        this.total = sorted.reduce((x, y) => x + y)
      },
      purchaseToDB() {
        let sorted = this.trimProducts.map(item => {
            return {
              id: item.id,
              purchase: item.qty_per_crate * item.purchasing
            }
          }
        );
        getClient().callFunction('PurchaseBar', [sorted]).then(
          res => {
            console.log(res)
            this.notify({text: 'Successfully', title: '', color: 'success'});
          }
        ).catch(
          err => {
            this.notify({text: err.message, title: 'Error', color: 'danger'})
          }
        )
      }

    },
    created() {
      this.listeners();
      this.getVendors()
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
      trimProducts() {
        this.sortVendorProducts()
      }
    }
  }
</script>

<style scoped>
  .vs-list--item .list-titles .vs-list--subtitle {
    font-size: 0.95rem !important;
  }
</style>
