<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card>
        <div class="vx-row flex justify-between mb-base">
          <div class="vx-col">
            <h3 class="mb-2">Bar Debts</h3>
            <p class="mb-1">Active: <span class="text-danger">{{active.length}} <span class="text-dark text-sm mr-1">holding</span> <span
              class="text-danger">{{getDebtTotal(active) | currency}}</span></span>
            </p>
            <p class="mb-1">Cleared: <span class="text-success">{{cleared.length}} <span class="text-dark text-sm mr-1">paid</span> <span
              class="money">{{getDebtTotal(cleared) | currency}}</span></span></p>
          </div>
          <div class="vx-col">
            <p class="text-gray">Showing {{records.length}} result(s) from <span class="text-dark text-bold">{{date.from}}</span>
              to
              <span class="text-dark text-bold">{{date.to}}</span></p>

          </div>
        </div>
        <vs-table stripe hoverFlat noDataText="No Debts"
                  :data="records">
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="date">Debtor Name</vs-th>
            <vs-th sort-key="paid">Surety Name</vs-th>
            <vs-th sort-key="">Amount</vs-th>
            <vs-th sort-key="status">Status</vs-th>
            <vs-th sort-key="expense">Date</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr]">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td :data="data[indextr].date">
                {{ data[indextr].name }}
              </vs-td>
              <vs-td :data="data[indextr].total">
                <div>{{ data[indextr].surety }}</div>
              </vs-td>
              <vs-td :data="data[indextr].paid">
                <div :class="status(tr)">{{ totalAmount(tr) | currency }}</div>
              </vs-td>

              <vs-td :data="data[indextr].status">
                <p class="text-success text-center text-sm" v-if="!data[indextr].status">
                  Paid
                </p>
                <p class="text-danger  text-center text-sm" v-else>
                  Unpaid
                </p>
              </vs-td>
              <vs-td :data="data[indextr].created_on">
                {{ data[indextr].date | moment("dddd, Do MMMM YYYY")}}
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

  import eventBus from "../../../../eventBus";

  export default {
    name: "DebtsTable",
    data: () => (
      {
        active: [],
        cleared: [],
        activeTotal: 0,
        clearedTotal: 0,
      }
    ),
    props: {
      records: {
        required: true
      },
      date: {
        required: true
      }
    },
    created() {
      this.listener()
      this.getActiveDebt(this.records);
      this.getClearedDebt(this.records);
    },
    watch: {
      records() {
        this.getActiveDebt(this.records);
        this.getClearedDebt(this.records);
        this.$vs.loading.close('#table-loader > .con-vs-loading');
      }
    },
    methods: {
      viewDetails(p) {
        eventBus.$emit('goToDebtDetails', p)
      },
      status(tr) {
        return (tr.status) ? 'text-danger' : 'text-success';
      },
      totalAmount(tr) {
        let sorted = tr.products.map(item =>
          item.price * item.holding
        );
        return sorted.reduce((x, y) => x + y, 0);
      },
      showLoading() {
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 2
        });
      },
      listener() {
        eventBus.$on('showLoading', () => this.showLoading())
      },
      getActiveDebt(data) {
        this.active = [];
        data.map(item => {
            if (item.status) {
              this.active.push(item)
            }
          }
        );

      },

      getClearedDebt(data) {
        this.cleared = [];
        data.map(item => {
            if (!item.status) {
              this.cleared.push(item)
            }
          }
        );
      },
      getDebtTotal(data) {
        let sortedArray = []
        data.map(item => item.products).map(item => {
          sortedArray.push(...item)
        });
        return sortedArray.map(item => parseInt(item.holding) * parseInt(item.price)).reduce((x, y) => x + y, 0)

      },
    }
  }
</script>

<style scoped>

</style>
