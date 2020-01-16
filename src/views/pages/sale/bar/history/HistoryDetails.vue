<template>
  <div class="vx-row p-base pt-4">
    <div class="vx-col w-full">
      <div>
        <p class="mb-4">Purchased Date : {{activePurchase.purchased_date}} </p>
        <p class="mb-4">Purchased Total : <span class="money">{{activePurchase.total.$numberInt | currency}}</span></p>
        <p class="mb-4">Paid Amount : <span class="money">{{activePurchase.paid | currency}}</span></p>
        <p class="mb-4" v-if="activePurchase.paid_remark">Remark : {{activePurchase.paid_remark}} </p>
        <p class="mb-4" v-if="activePurchase.expense">Expense : <span class="text-danger"> {{activePurchase.expense | currency}}</span>
        </p>
        <p class="mb-4" v-if="activePurchase.expense_remark"> Expense Remark : {{activePurchase.expense_remark}} </p>
        <p class="mb-4"> Recorded On : {{activePurchase.created_on}} </p>
        <p class="mb-4"> Recorded By: {{activePurchase.created_by}}</p>
      </div>

      <div v-if="showProducts">
        <vs-divider color="primary" position="left-center"><span class="text-primary">Products</span></vs-divider>
        <vs-list class="pt-0">
          <div v-for="p in activePurchase.products" v-if="p.purchasing.length">
            <vs-list-header :title="p.vendor | capitalize"
                            color="dark" style="font-size:.85rem"/>
            <div v-for="ps in p.purchasing">
              <vs-list-item icon-pack="feather"
                            icon="icon-check"
                            :subtitle="returnSubtitle(ps)"
                            :title="ps.name | capitalize"
              />

            </div>
          </div>
          <div class="mt-4 mb-5 ml-10">
            <div class="flex justify-start mb-2" v-for="p in activePurchase.products" v-if="p.purchasing.length">
              <h6>{{p.vendor | capitalize}} : {{getVendorTotal(p.purchasing ) | currency}} </h6>
            </div>
          </div>

        </vs-list>
      </div>
    </div>
    <div class="flex vx-col w-full">
      <vs-button
        v-if="!showProducts"
        color="success"
        type="border"
        class="mr-2 w-full" @click="showProducts=!showProducts">
        Show More Details
      </vs-button>
      <vs-button
        v-if="showProducts"
        color="danger"
        type="border"
        class="mr-2 w-full" @click="showProducts=!showProducts">
        Hide Details
      </vs-button>
    </div>

  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";

  export default {
    name: "HistoryDetails",
    props: {
      activePurchase: {
        required: true
      }
    },
    data: () => ({
      showProducts: false
    }),
    methods: {
      returnSubtitle(ps) {
        return `${ps.purchasing.$numberInt} Crate(s)(${ps.qty_per_crate * ps.purchasing.$numberInt} items) cost ‎₦${ps.purchasing.$numberInt * ps.crate_price.$numberInt}`
      },
      getVendorTotal(p) {
        let sortedArray = p.map(item =>
          item.crate_price.$numberInt * item.purchasing.$numberInt
        );
        return sortedArray.reduce((x, y) => x + y)
      },
    },
    created() {
      eventBus.$emit('showInnerActions', true)
    },
    beforeDestroy() {
      eventBus.$emit('showInnerActions', false)
    },
  }
</script>

<style scoped>

</style>
