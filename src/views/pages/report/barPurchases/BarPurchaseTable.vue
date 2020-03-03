<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card>
        <div class="vx-row flex justify-between mb-base">
          <div class="vx-col">
            <h3 class="mb-2">Bar Purchases</h3>
            <p class="mb-1" v-if="records.length">Purchase Total : <span class="money">{{getPurchaseTotal(records) | currency}}</span>
            </p>
            <p v-if="records.length">Paid Total : <span class="money">{{getPaidTotal(records) | currency}}</span></p>
          </div>
          <div class="vx-col">
            <p class="text-gray">Showing {{records.length}} result(s) from <span class="text-dark text-bold">{{date.from}}</span>
              to
              <span class="text-dark text-bold">{{date.to}}</span></p>

          </div>
        </div>
        <vs-table stripe hoverFlat noDataText="No Record Found"
                  :data="records">
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="date">Date</vs-th>
            <vs-th sort-key="paid">Purchase Total</vs-th>
            <vs-th sort-key="">Paid Total</vs-th>
            <vs-th sort-key="expense">Expense</vs-th>
            <!--            <vs-th sort-key="created_on">Recorded On</vs-th>-->
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr]">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td :data="data[indextr].date">
                {{ data[indextr].date | moment("dddd, MMMM Do YYYY") }}
              </vs-td>
              <vs-td :data="data[indextr].total">
                <div class="money">{{ data[indextr].total | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].paid">
                <div class="money">{{ data[indextr].paid | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].expense">
                <div class="text-danger">{{ data[indextr].expense | currency }}</div>
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
  import {getClient} from "../../../../stitch/app";


  export default {
    name: "BarPurchaseTable",
    data: () => ({}),
    props: {
      records: {
        required: true
      }, date: {
        required: true
      }
    },
    methods: {
      viewDetails(p) {
        eventBus.$emit('goToPurchaseDetails', p)
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
      getPurchaseTotal(data) {
        let sorted = data.map(item =>
          parseInt(item.total)
        );
        return sorted.reduce((x, y) => x + y, 0);
      },
      getPaidTotal(data) {
        let sorted = data.map(item =>
          parseInt(item.paid)
        );
        return sorted.reduce((x, y) => x + y, 0);
      },
    },
    created() {
      this.listener()
    },
    watch: {
      records() {
        this.$vs.loading.close('#table-loader > .con-vs-loading');

      }
    }

  }
</script>

<style scoped>

</style>
