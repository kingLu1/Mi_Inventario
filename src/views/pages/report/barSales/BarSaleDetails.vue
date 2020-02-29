<template>
  <div class="vx-row p-base pt-4 " id="table-loader">
    <div class="vx-col w-full">
      <div>
        <p class="mb-4">Date : {{activeSales.sales_date}} </p>
        <p class="mb-4">Sales Total : <span class="money">{{activeSales.total.$numberInt | currency}}</span></p>
        <p class="mb-4">Cash Remit : <span class="money">{{activeSales.remit_cash | currency}}</span></p>
        <p class="mb-4">Credit Remit : <span class="money">{{activeSales.remit_credit | currency}}</span></p>
        <p class="mb-4">Bad Products : {{activeSales.bad_products.length}} <span v-if="activeSales.bad_products.length">
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
        <p class="mb-4"> Recorded On : {{activeSales.created_on}} </p>
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
      <vs-button
        color="danger"
        v-if="$acl.check('superAdmin')"
        class="mr-2 w-full" @click="openConfirm">
        Delete
      </vs-button>

    </div>

  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import {getClient} from "../../../../../stitch/app";

  export default {
    name: "HistoryDetails",
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
        return `${ps.sold.$numberInt} items(s) cost ‎₦${ps.sold.$numberInt * ps.selling_price.$numberInt}`

      },
      returnSubtitleForBadProducts(ps) {
        return `${ps.product} - ${ps.bad.$numberInt} faulty item cost ‎₦${ps.price * ps.bad.$numberInt} (${ps.price}/item)`

      },
      getVendorTotal(p) {
        let sortedArray = p.map(item =>
          item.selling_price.$numberInt * item.sold.$numberInt
        );
        return sortedArray.reduce((x, y) => x + y)
      },
      openConfirm() {
        let tr = this.activeSales;
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Confirm`,
          text: `Are you sure  you want to delete ${tr.sales_date} Sales Record?`,
          accept: this.acceptDelete
        });
      },
      acceptDelete() {
        let data = [{sales_date: this.activeSales.sales_date}];
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        getClient().callFunction('SaleDelete', data).then(() => {
            this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
            eventBus.$emit('backToHistoryTable')
          }
        ).catch(
          (err) => {
            this.$vs.loading.close('#table-loader > .con-vs-loading');
            console.log(err)
          }
        )
      },
    },
    created() {
      eventBus.$emit('showInnerActions', true);
      console.log(this.activeSales)
    },
    beforeDestroy() {
      eventBus.$emit('showInnerActions', false)
    },
  }
</script>

<style scoped>
  .vs-list--title {
    font-weight: 100 !important;
  }
</style>
