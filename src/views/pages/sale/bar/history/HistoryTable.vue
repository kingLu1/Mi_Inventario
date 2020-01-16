<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card title="Sales History">
        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Purchases Available"
                  :data="purchases" search>
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="purchased_date">Sales Date</vs-th>
            <vs-th sort-key="paid">Sales Total</vs-th>
            <vs-th sort-key="">Cash Remitted</vs-th>
            <vs-th sort-key="expense">Credit Remit</vs-th>

            <vs-th sort-key="created_by">Debts</vs-th>
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
              <vs-td :data="data[indextr].created_on">
                <vs-button size="small" color="danger" v-if="!data[indextr].debts" type="border"
                           class="mr-2 round">
                  {{ data[indextr].debts}}
                </vs-button>
                <vs-button size="small" color="success" v-else type="border"
                           class="mr-2 round">
                  {{ data[indextr].debts}}
                </vs-button>

              </vs-td>
              <vs-td :data="data[indextr].created_on">
                <vs-button size="small" color="danger" type="border"
                           class="mr-2 round">
                  {{ data[indextr].bad_products.length}}
                </vs-button>

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
      purchases: []
    }),
    mounted() {
      this.getPurchases()
    },
    methods: {
      getPurchases() {
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        this.axios.get(getSales).then((res) => {
          this.purchases = res.data;
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
      }
    }

  }
</script>

<style scoped>

</style>
