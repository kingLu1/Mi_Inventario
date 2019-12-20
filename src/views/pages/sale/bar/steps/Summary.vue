<template>
  <div class="p-base px-4 pt-2">
    <vs-divider color="warning" position="left-center">
      <h4 class="font-semibold">Sales Summary</h4>
    </vs-divider>
    <vs-list >
      <div v-for="p in products" v-if="p.sold.length">
        <vs-list-header :title="p.vendor | capitalize"
                        color="dark"/>
        <div v-for="ps in p.sold">
          <vs-list-item icon-pack="feather"
                        icon="icon-check"
                        :title="ps.name | capitalize"
                        :subtitle="returnSubtitle(ps)"/>
        </div>
      </div>
      <div class="mt-2 mb-5">
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
    <div class="flex justify-between">
      <vs-button
        color="warning" type="filled"
        class="ml-2 " @click="back()">
        Back
      </vs-button>
      <vs-button
        color="warning" type="filled"
        class="ml-2 " @click="sendToMongo">
        Submit
      </vs-button>
    </div>
  </div>

</template>

<script>

  import eventBus from "../../../../../eventBus";
  import {getVendors} from "../../../../../stitch/api/inventory";
  import {getClient} from '../../../../../stitch/app'


  export default {
    name: "Summary",
    props: {
      soldProducts: {
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
        this.soldProducts.forEach(items => {
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
          this.products[ind].sold.push(items);
          // }

          // }
        })
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
      sendToMongo() {
        let sold = this.soldProducts.map(item => {
            return {id: item.id, sold: 0 - item.sold}
          }
        );
        console.log('sold:', sold)
        if (this.total !== 0) {
          getClient().callFunction('SalesBar', [sold]).then(
            res => {
              // eventBus.$emit("soldSubmitted");
              // console.log(res);
              // this.products = '';
              this.notify({text: 'Successfully', title: '', color: 'success'});
            }
          ).catch(
            err => {
              this.notify({text: err.message, title: 'Error', color: 'danger'})
            }
          )
        }
        // console.log('here-----')

      },

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
      products() {
        this.sortVendorProducts()
      }
    },
  }
</script>

<style scoped>

</style>
