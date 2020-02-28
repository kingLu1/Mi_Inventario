<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card title="Purchase History">
        <vs-table max-items="10" stripe hoverFlat noDataText="No Record Found"
                  :data="purchases">
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
              <vs-td :data="data[indextr].purchased_date">
                {{ data[indextr].purchased_date | moment("dddd, MMMM Do YYYY") }}
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
  // import {getPurchases} from '../../../../../stitch/api/purchases';
  import eventBus from "../../../../eventBus";
  // import {getClient} from "../../../../../stitch/app";


  export default {
    name: "BarPurchaseTable",
    data: () => ({
      purchases: [],
      selected: {}
    }),
    mounted() {
      // this.getPurchases()
    },
    methods: {
      viewDetails(p) {
        eventBus.$emit('goToDetails', p)
      },
      // openConfirm(tr) {
      //   this.selected = tr;
      //   this.$vs.dialog({
      //     type: 'confirm',
      //     color: 'danger',
      //     title: `Confirm`,
      //     text: `Are you sure  you want to delete ${tr.purchased_date} Purchase Record?`,
      //     accept: this.acceptDelete
      //   });
      // },
      // acceptDelete() {
      //   let data = [{purchased_date: this.selected.purchased_date}];
      //   this.$vs.loading({
      //     container: '#table-loader',
      //     type: 'sound',
      //     scale: 1
      //   });
      //   getClient().callFunction('PurchaseDelete', data).then(() => {
      //       this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
      //       this.getPurchases()
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
