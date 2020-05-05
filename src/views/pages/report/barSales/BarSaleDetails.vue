<template>
  <vx-card>
    <div class="flex justify-between items-center">
      <div class="">
        <h4>Record For {{activeSales.date | moment("dddd, Do MMMM  YYYY")}}</h4>
      </div>
      <vx-tooltip text="Go Back" position="top">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="  border" @click="goToSaleTable()">
          Back
        </vs-button>
      </vx-tooltip>
    </div>
    <div class="vx-row pt-4 " id="table-loader">
      <div class="vx-col w-full">
        <div>
          <!--          <p class="mb-4">Date : {{activeSales.date}} </p>-->
          <p class="mb-4">Sales Total : <span class="money">{{activeSales.total | currency}}</span></p>
          <p class="mb-4">Cash Remit : <span class="money">{{activeSales.remit_cash | currency}}</span></p>
          <p class="mb-4">Credit Remit : <span class="money">{{activeSales.remit_credit | currency}}</span></p>
          <p class="mb-4">Bad Products : {{activeSales.bad_products.length}} <span
            v-if="activeSales.bad_products.length">
          <span class="text-primary text-sm font-semibold cursor-pointer" v-if="!showBadProducts "
                @click="showBadProducts = !showBadProducts">Show</span>
          <span class="text-danger text-sm cursor-pointer" v-else
                @click="showBadProducts = !showBadProducts">Hide</span>
          </span>
          </p>
          <div v-if="showBadProducts" class="mb-4 -mt-2">
            <vx-card card-border>
              <div slot="no-body">
                <vs-list class="pt-0" v-for="s in activeSales.bad_products">
                  <vs-list-item :subtitle="returnSubtitleForBadProducts(s)"
                  />
                </vs-list>
              </div>
            </vx-card>
          </div>
          <!--          TODO implement Show Debtors-->
          <p class="mb-4">Debtors : {{activeSales.bad_products.length}} <span v-if="activeSales.debts">
          <span class="text-primary text-sm font-semibold cursor-pointer" v-if="!showBadProducts "
                @click="showBadProducts = !showBadProducts">Show</span>
          <span class="text-danger text-sm cursor-pointer" v-else
                @click="showBadProducts = !showBadProducts">Hide</span>
          </span>
          </p>
          <div v-if="showBadProducts" class="mb-4 -mt-2">
            <vx-card card-border>
              <div slot="no-body">
                <vs-list class="pt-0" v-for="s in activeSales.bad_products">

                  <vs-list-item :subtitle="returnSubtitleForBadProducts(s)"
                  />


                </vs-list>
              </div>
            </vx-card>
          </div>
          <p class="mb-4"> Recorded On : {{activeSales.created_on | moment("MMMM Do YYYY, h:mm:ss a")}} </p>
          <p class="mb-4"> Recorded By: {{activeSales.created_by}}</p>
        </div>

        <div v-if="showProducts">
          <vs-divider position="left-center"><span class="">Sales</span></vs-divider>
          <vs-list class="pt-0">
            <div v-for="p in activeSales.products" v-if="p.sold.length">
              <vs-list-header :title="p.vendor | capitalize"
                              color="dark" style="font-size:.85rem"/>
              <div v-for="ps in p.sold">
                <vs-list-item icon-pack="feather"
                              icon="icon-check"
                              :subtitle="returnSubtitle(ps)"
                              :title="ps.name | capitalize"
                />

              </div>
            </div>
            <div class="mt-4 mb-5 ml-10">
              <div class="flex justify-end mb-2" v-for="p in activeSales.products" v-if="p.sold.length">
                <h6>{{p.vendor | capitalize}} : {{getVendorTotal(p.sold ) | currency}} </h6>
              </div>
            </div>

          </vs-list>
        </div>
      </div>
      <div class="flex vx-col w-full">
        <vs-button
          v-if="!showProducts"
          color="primary"
          class="mr-2 w-full" @click="showProducts=!showProducts">
          Show Products
        </vs-button>
        <vs-button
          v-if="showProducts"
          color="danger"
          type="border"
          class="mr-2 w-full" @click="showProducts=!showProducts">
          Hide Details
        </vs-button>
        <!--        <vs-button-->
        <!--          color="danger"-->
        <!--          v-if="$acl.check('superAdmin')"-->
        <!--          class="mr-2 w-full" @click="openConfirm">-->
        <!--          Delete-->
        <!--        </vs-button>-->

      </div>

    </div>
  </vx-card>
</template>

<script>
  import eventBus from "../../../../eventBus";
  import {getClient} from "../../../../stitch/app";

  export default {
    name: 'BarSaleDetails',
    props: {
      activeSales: {
        required: true
      }
    },
    data: () => ({
      showProducts: false,
      showBadProducts: false
    }),
    methods: {
      returnSubtitle(ps) {
        return `${ps.sold} items(s) cost ‎₦${ps.sold * ps.selling_price}`

      },
      returnSubtitleForBadProducts(ps) {
        return `${ps.product} - ${ps.bad} faulty item cost ‎₦${ps.price * ps.bad} (${ps.price}/item)`

      },
      getVendorTotal(p) {
        let sortedArray = p.map(item =>
          item.selling_price * item.sold
        );
        return sortedArray.reduce((x, y) => x + y)
      },
      // openConfirm() {
      //   let tr = this.activeSales;
      //   this.$vs.dialog({
      //     type: 'confirm',
      //     color: 'danger',
      //     title: `Confirm`,
      //     text: `Are you sure  you want to delete ${tr.date} Sales Record?`,
      //     accept: this.acceptDelete
      //   });
      // },
      // acceptDelete() {
      //   let data = [{date: this.activeSales.date}];
      //   this.$vs.loading({
      //     container: '#table-loader',
      //     type: 'sound',
      //     scale: 1
      //   });
      //   getClient().callFunction('SaleDelete', data).then(() => {
      //       this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
      //       eventBus.$emit('backToHistoryTable')
      //     }
      //   ).catch(
      //     (err) => {
      //       this.$vs.loading.close('#table-loader > .con-vs-loading');
      //       console.log(err)
      //     }
      //   )
      // },
      goToSaleTable() {
        eventBus.$emit('goToSaleTable')
      }
    },
    created() {
      eventBus.$emit('showDatePicker', false)
    },
    beforeDestroy() {
      eventBus.$emit('showDatePicker', true)
    },
  }
</script>

<style scoped>
  .vs-list--title {
    font-weight: 100 !important;
  }
</style>
