<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card>
        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Purchases Available"
                  :data="purchases" search>
          <template slot="thead">
            <vs-th>#</vs-th>
            <vs-th sort-key="purchased_date">Purchase Date</vs-th>
            <vs-th sort-key="paid">Purchase Total</vs-th>
            <vs-th sort-key="">Paid Total</vs-th>
            <vs-th sort-key="expense">Expense Total</vs-th>
            <vs-th sort-key="created_by">Recorded By</vs-th>
            <!--            <vs-th sort-key="created_on">Recorded On</vs-th>-->
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr]">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td :data="data[indextr].urchased_date">
                {{ data[indextr].purchased_date }}
              </vs-td>
              <vs-td :data="data[indextr].total">
                <div class="money">{{ data[indextr].total.$numberInt | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].paid">
                <div class="money">{{ data[indextr].paid | currency }}</div>
              </vs-td>
              <vs-td :data="data[indextr].expense">
                <div class="text-danger">{{ data[indextr].expense | currency }}</div>
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
  import {getPurchases} from '../../../../../stitch/api/purchases';
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
        this.axios.get(getPurchases).then((res) => {
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
      viewDetails(p){
        eventBus.$emit('goToDetails', p)
      }
    }

  }
</script>

<style scoped>

</style>
