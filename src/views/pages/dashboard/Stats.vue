<template>
  <div class="vx-row">
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/5 xl:w-1/5 mb-base">
      <vx-card class="overflow-hidden">
        <div class="font-semibold mb-2 text-uppercase"><span>DEBTS </span>
        </div>
        <div>
          <span class="mb-1 text-left text-danger">{{outStandingDebtTotal() | currency}}</span>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/5 xl:w-1/5 mb-base">
      <vx-card class="overflow-hidden">
        <div class="font-semibold mb-2 text-uppercase"><span>LOSS </span>
        </div>
        <div>
          <span class="mb-1 text-left text-danger">{{lostTotal() | currency}}</span>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  import {getBarUnpaidDebts} from "../../../stitch/api/debts";
  import {getSales} from "../../../stitch/api/sales";

  export default {
    name: "Stats",
    data() {
      return {
        cash: 100000,
        debts: [],
        badProducts: []
      }
    },
    methods: {
      getDebts() {
        this.axios.get(getBarUnpaidDebts).then((res) => {
          this.debts = res.data;
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      outStandingDebtTotal() {
        let products = this.debts.map(item => item.products);
        let i;
        let arr = [];
        for (i = 0; i < products.length; i++) {
          for (let j = 0; j < products[i].length; j++) {
            arr.push(parseInt(products[i][j].holding.$numberInt) * parseInt(products[i][j].price.$numberInt))
          }
        }
        return arr.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      },
      getSales() {
        this.axios.get(getSales).then((res) => {
          this.badProducts = res.data;
          // console.log(res.data)
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      lostTotal() {
        let products = this.badProducts.map(item => item.bad_products);
        let i;
        let arr = [];
        for (i = 0; i < products.length; i++) {
          for (let j = 0; j < products[i].length; j++) {
            if (products[i].length) {
              arr.push(parseInt(products[i][j].bad.$numberInt) * parseInt(products[i][j].price.$numberInt))
            }
          }
        }
        return arr.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      },
    },
    created() {
      this.getSales();
      this.getDebts()
    }
  }
</script>

<style scoped>

</style>
