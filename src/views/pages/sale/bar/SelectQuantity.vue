<template>
  <div>
    <div class="vx-row">
      <div class="vx-col  w-1/5">
        <p class="font-bold ">Name</p>
      </div>
      <div class="vx-col  w-1/5">
        <p class="font-bold text-center">Crate Price</p>
      </div>
      <div class="vx-col  w-1/5">
        <p class="font-bold text-center">Quantity Per Crate</p>
      </div>

      <div class="vx-col  w-1/5">
        <p class="font-bold text-center">Purchasing</p>
      </div>
      <div class="vx-col  w-1/5">
        <p class="font-bold text-center">Amount</p>
      </div>
    </div>
    <div class="vx-row flex items-center" v-for="p in purchase">

      <div class="vx-col   w-1/5">
        <p>{{p.name | capitalize}}</p>
      </div>

      <div class="vx-col flex justify-center w-1/5">
        <p>{{p.crate_price | currency}}</p>
      </div>
      <div class="vx-col flex justify-center w-1/5">
        <p>{{p.qty_per_crate}}</p>
      </div>
      <div class="vx-col  w-1/5">
        <p class="flex">
          <span class="centerx">
            <vs-input-number v-model="p.purchasing" color="dark" :label="totalQuantity(p)"/>
          </span>
        </p>
      </div>
      <div class="vx-col  flex justify-center w-1/5">
        <p class="money">{{p.crate_price * p.purchasing | currency}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import eventBus from "../../../../eventBus";

  export default {
    name: "SelectQuantity",
    props: {
      chips: {
        required: true
      }
    },
    data: () => ({
      passengers: 1,
      purchase: []
    }),
    methods: {
      trimChipsValue() {
        //trim selected products for computation in this component
        this.purchase = this.chips.map(item => {
            return {
              id: item._id,
              name: item.name,
              vendor: item.vendor,
              qty_per_crate: item.qty_per_crate,
              crate_price: parseInt(item.crate_price, 10),
              purchasing: 0
            }
          }
        );
        // sent to submit Component
        eventBus.$emit('trimProducts', this.purchase)
      },
      totalQuantity(p) {
        return `Crate:(${p.qty_per_crate * p.purchasing})`
      }
    },
    watch: {
      chips() {
        this.trimChipsValue()
      },
      purchase() {
        // sent to submit Component
        eventBus.$emit('changeTrimProducts', this.purchase)

      }
    }
  }
</script>

<style scoped>

</style>
