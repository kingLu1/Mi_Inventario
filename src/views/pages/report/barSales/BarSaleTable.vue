<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card>
        <div class="vx-row flex justify-between mb-base">
          <div class="vx-col">
            <h3 class="mb-2">Bar Sales</h3>
            <p class="mb-1">Sales Total : <span class="money">{{currency | currency}}</span></p>
            <p class="mb-1">Cash Remit Total : <span class="money">{{currency | currency}}</span></p>
            <p class="mb-1">Credit Remit Total : <span class="money">{{currency | currency}}</span></p>
            <p>Debt Total : <span class="money">{{currency | currency}}</span></p>
          </div>
          <div class="vx-col">
            <p class="text-gray">Showing 10 result(s) from <span class="text-dark text-bold">20/20/2000</span> to
              <span class="text-dark text-bold">30/30/300</span></p>

          </div>
        </div>
        <vs-table stripe hoverFlat noDataText="No Record Found"
                  :data="sales">
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="sales_date">Date</vs-th>
            <vs-th sort-key="paid">Sales Total</vs-th>
            <vs-th sort-key="">Cash Remit</vs-th>
            <vs-th sort-key="expense">Credit Remit</vs-th>

            <vs-th sort-key="debts">Debts</vs-th>
            <vs-th sort-key="created_by">Bad Products</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr]">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td :data="data[indextr].sales_date">
                {{ data[indextr].sales_date }}
              </vs-td>
              <vs-td :data="data[indextr].total">
                <div class="money">{{ data[indextr].total.$numberInt | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].paid">
                <div class="money">{{ data[indextr].remit_cash | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].expense">
                <div class="money">{{ data[indextr].remit_credit | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].debts">
                <p class="text-success text-center text-sm" v-if="!data[indextr].debts">
                  No
                </p>
                <p class="text-danger  text-center text-sm" v-else>
                  Yes
                </p>

              </vs-td>
              <vs-td :data="data[indextr].created_on">
                <p class="text-sm text-center">
                  {{ data[indextr].bad_products.length}}
                </p>

              </vs-td>
              <vs-td>
                <div class="flex">
                  <vx-tooltip text="See Details" position="top">
                    <vs-button type="border" icon-pack="feather" icon="icon-eye"
                               color="primary"
                               class="mr-2"
                               @click="viewDetails(tr)">
                    </vs-button>
                  </vx-tooltip>
                  <vx-tooltip text="Delete" position="top" v-if="$acl.check('superAdmin')">
                    <vs-button s icon-pack="feather" icon="icon-trash"
                               color="danger"

                    >
                      <!--                      @click="openConfirm(tr)"-->
                    </vs-button>
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
  // import {getSales} from '../../../../../stitch/api/sales';
  // import eventBus from "../../../../../eventBus";
  // import {getClient} from "../../../../../stitch/app";


  export default {
    name: "HistoryTable",
    data: () => ({
      sales: [],
      selected: {},
    }),
    props: {
      records: {
        required: true
      }
    },
    methods: {

      viewDetails(p) {
        // eventBus.$emit('goToDetails', p)
      },
      // openConfirm(tr) {
      //   this.selected = tr;
      //   this.$vs.dialog({
      //     type: 'confirm',
      //     color: 'danger',
      //     title: `Confirm`,
      //     text: `Are you sure  you want to delete ${tr.sales_date} Sales Record?`,
      //     accept: this.acceptDelete
      //   });
      // },
      // acceptDelete() {
      //   let data = [{sales_date: this.selected.sales_date}];
      //   this.$vs.loading({
      //     container: '#table-loader',
      //     type: 'sound',
      //     scale: 1
      //   });
      //   getClient().callFunction('SaleDelete', data).then(() => {
      //       this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
      //       this.getSales()
      //     }
      //   ).catch(
      //     (err) => {
      //       this.$vs.loading.close('#table-loader > .con-vs-loading');
      //       console.log(err)
      //     }
      //   )
      // },
    }

  }
</script>

<style scoped>

</style>
