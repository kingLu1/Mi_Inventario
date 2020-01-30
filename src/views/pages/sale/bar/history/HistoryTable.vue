<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card title="Sales History">
        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Purchases Available"
                  :data="sales" search>
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="sales_date">Sales Date</vs-th>
            <vs-th sort-key="paid">Sales Total</vs-th>
            <vs-th sort-key="">Cash Remitted</vs-th>
            <vs-th sort-key="expense">Credit Remit</vs-th>

            <vs-th sort-key="debts">Debts</vs-th>
            <vs-th sort-key="created_by">Bad Products</vs-th>
            <vs-th sort-key="created_by">Recorded By</vs-th>
            <!--            <vs-th sort-key="created_on">Recorded On</vs-th>-->
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
              <vs-td :data="data[indextr].created_on">
                {{ data[indextr].created_by}}
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
                               @click="deleteSales(tr)"
                    >
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
  import {getSales} from '../../../../../stitch/api/sales';
  import eventBus from "../../../../../eventBus";


  export default {
    name: "HistoryTable",
    data: () => ({
      sales: []
    }),
    mounted() {
      this.getSales()
    },
    methods: {
      getSales() {
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        this.axios.get(getSales).then((res) => {
          this.sales = res.data;
          this.$vs.loading.close('#table-loader > .con-vs-loading');
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
          this.$vs.loading.close('#table-loader  > .con-vs-loading')
        });
      },
      viewDetails(p) {
        eventBus.$emit('goToDetails', p)
      },
      deleteSales(p) {

      }
    }

  }
</script>

<style scoped>

</style>
