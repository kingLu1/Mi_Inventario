<template>
  <vs-list>

    <div v-for="p in products" v-if="p.sold.length">
      <vs-list-header :title="p.vendor | capitalize" color="dark"/>
      <div v-for="ps in p.sold">

        <vs-list-item icon-pack="feather" icon="icon-check" :title="ps.name | capitalize"
                      :subtitle="returnSubtitle(ps)"
        />
      </div>


    </div>
    <div class="mt-2">
      <div class="flex justify-end mb-2" v-for="p in products" v-if="p.sold.length">
        <h6>{{p.vendor | capitalize}} Total : {{getVendorTotal(p.sold ) | currency}} </h6>
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
    props: {
      soldProducts: {
        required: true
      }
    },
    data: () => ({
      vendors: [],
      products: [],
      total: 0
    }),
    methods: {
      listeners() {
        eventBus.$on('submit', () => {
          this.purchaseToDB()
        });
        eventBus.$on('re-evaluate', () => {
          this.products = this.vendors.map(item => {
              return {
                id: item._id,
                vendor: item.name,
                sold: []
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
        this.soldProducts.forEach(items => {
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
              this.products[ind].sold.push(items);
            }

          }
        })
      },
      checkInChips(p, ind) {
        let product = this.products[ind].sold.find(item => item.name === p.name);
        return !!product;
      },
      returnSubtitle(ps) {
        return `Sold ‎₦${ps.selling_price * ps.sold} at price ‎₦${ps.selling_price} for ${ps.sold} item(s)`
      },
      getVendorTotal(p) {
        let sortedArray = p.map(item =>
          item.selling_price * item.sold
        )
        this.getTotal()
        return sortedArray.reduce((x, y) => x + y)

      },
      getTotal() {
        let sorted = this.soldProducts.map(item =>
          item.selling_price * item.sold
        );
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
        if (this.total !== 0) {
          getClient().callFunction('SalesBar', [sorted]).then(
            res => {
              eventBus.$emit("formSubmitted");
              this.notify({text: 'Successfully', title: '', color: 'success'});
            }
          ).catch(
            err => {
              this.notify({text: err.message, title: 'Error', color: 'danger'})
            }
          )
        }

      }

    },
    created() {
      this.listeners();
      this.getVendors();


    },
    watch: {
      vendors() {
        this.products = this.vendors.map(item => {
            return {
              id: item._id,
              vendor: item.name,
              sold: []
            }
          }
        );
      },
      soldProducts() {
        this.sortVendorProducts()
      }
    }
  }
</script>

<style scoped>

</style>
