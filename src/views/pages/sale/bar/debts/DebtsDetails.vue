<template>
  <div class="vx-row p-base pt-4">
    <div class="vx-col w-full">
      <div>
        <p class="mb-4">Debt Date : {{activeDebt.date}} </p>
        <p class="mb-4">Customer : {{activeDebt.name}} </p>
        <p class="mb-4">Surety : {{activeDebt.surety}} </p>
        <p class="mb-4">Amount : <span class="text-danger">{{getDebtTotal() | currency}}</span></p>
        <div v-if="showDetails" class="mb-4 pr-2">
          <vs-divider position="left-center">Details</vs-divider>
          <vx-card card-border>

            <div slot="no-body">
              <vs-list class="pt-0" v-for="s in activeDebt.products">

                <vs-list-item :subtitle="returnSubtitleForProducts(s)"
                />
              </vs-list>
            </div>
          </vx-card>
        </div>
      </div>


    </div>
    <div class="flex vx-col w-full">
      <vs-button
        v-if="!showDetails"
        color="primary"
        class="mr-2 w-full" @click="showDetails=!showDetails">
        Show More Details
      </vs-button>
      <vs-button
        v-if="showDetails"
        color="danger"
        type="border"
        class="mr-2 w-full" @click="showDetails=!showDetails">
        Hide Details
      </vs-button>
    </div>

  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";

  export default {
    name: "DebtsDetails",
    props: {
      activeDebt: {
        required: true
      }
    },
    data: () => ({
      showDetails: false
    }),
    methods: {
      returnSubtitleForProducts(ps) {
        return `${ps.product} - Holding ${ps.holding.$numberInt} item(s) cost ‎₦${ps.price * ps.holding.$numberInt} (${ps.price}/item)`

      },
      getDebtTotal() {
        let sorted = this.activeDebt.products.map(item =>
          item.price * item.holding.$numberInt
        );
        return sorted.reduce((x, y) => x + y);
      }
    },
    created() {
      eventBus.$emit('showInnerActions', true);
      console.log(this.activeDebt)
    },
    beforeDestroy() {
      eventBus.$emit('showInnerActions', false)
    },
  }
</script>

<style scoped>

</style>
