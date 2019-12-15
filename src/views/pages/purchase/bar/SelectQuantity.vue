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
            <vs-input-number v-model="p.purchasing" :label="totalQuantity(p)"/>
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
        this.purchase = this.chips.map(item => {
            return {
              id: item.id,
              name: item.name,
              vendor: item.vendor,
              qty_per_crate: item.qty_per_crate,
              crate_price: item.crate_price,
              purchasing: 0
            }
          }
        )
      },
      totalQuantity(p) {
        return `Crate:(${p.qty_per_crate * p.purchasing})`
      }
    },
    watch: {
      chips() {
        this.trimChipsValue()
      }
    }
  }
</script>

<style scoped>

</style>
