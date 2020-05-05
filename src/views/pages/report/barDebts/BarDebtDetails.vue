<template>
  <vx-card>
    <div class="flex justify-between items-center">
      <div class="">
        <h4>Record For {{activeDebt.date | moment("dddd, MMMM Do YYYY")}}</h4>
      </div>
      <vx-tooltip text="Go Back" position="top">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="  border" @click="goToDebtTable()">
          Back
        </vs-button>
      </vx-tooltip>
    </div>
    <div class="vx-row pt-4" id="table-loader">
      <div class="vx-col w-full">
        <div>
          <!--          <p class="mb-4">Debt Date : {{activeDebt.date}} </p>-->
          <p class="mb-4">Customer : {{activeDebt.name}} </p>
          <p class="mb-4">Surety : {{activeDebt.surety}} </p>
          <p class="mb-4">Status : <span class="text-success text-center text-md"
                                         v-if="!activeDebt.status">Paid </span>
            <span class="text-danger  text-center text-md" v-else>
          Unpaid
        </span></p>
          <p class="mb-4" v-if="activeDebt.date_paid">Paid On : {{activeDebt.date_paid | moment("MMMM Do YYYY, h:mm:ss a")}} </p>
          <p class="mb-4">Amount : <span class="text-danger">{{getDebtTotal() | currency}}</span></p>

          <div v-if="showDetails" class="mb-4 pr-2">
            <vs-divider position="left-center">Details</vs-divider>
            <vx-card card-border>
              <div slot="no-body">
                <vs-list class="pt-0" v-for="s in activeDebt.products">
                  <vs-list-item :subtitle="returnSubtitleForProducts(s)"/>
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
    name: "DebtsDetails",
    props: {
      activeDebt: {
        required: true
      }
    },
    data: () => ({
      showDetails: false,
    }),
    methods: {
      returnSubtitleForProducts(ps) {
        return `${ps.product} - Holding ${ps.holding} item(s) cost ‎₦${ps.price * ps.holding} (${ps.price}/item)`

      },
      getDebtTotal() {
        let sorted = this.activeDebt.products.map(item =>
          item.price * item.holding
        );
        return sorted.reduce((x, y) => x + y);
      },
      // openConfirm() {
      //   let tr = this.activeDebt;
      //   this.$vs.dialog({
      //     type: 'confirm',
      //     color: 'danger',
      //     title: `Confirm`,
      //     text: `Are you sure  you want to delete ${tr.name}[${tr.surety}] Debt?`,
      //     accept: this.acceptDelete
      //   });
      // },
      // acceptDelete() {
      //   let data = [{_id: this.activeDebt._id}];
      //   this.$vs.loading({
      //     container: '#table-loader',
      //     type: 'sound',
      //     scale: 1
      //   });
      //   getClient().callFunction('DebtDelete', data).then(() => {
      //       this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
      //       eventBus.$emit('backToDebtsTable')
      //     }
      //   ).catch(
      //     (err) => {
      //       this.$vs.loading.close('#table-loader > .con-vs-loading');
      //       console.log(err)
      //     }
      //   )
      // },
      goToDebtTable() {
        eventBus.$emit('goToDebtTable')
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

</style>
