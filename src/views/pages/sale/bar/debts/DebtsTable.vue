<template>
  <div id="table-loader" class="vs-con-loading__container">
    <div id="data-list-list-view " class="data-list-container ">
      <vx-card title="Debts History">
        <vs-table max-items="10" pagination stripe hoverFlat noDataText="No Debts"
                  :data="debts" search>
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
              </vs-td>    <vs-td :data="data[indextr].created_on">
                {{ data[indextr].date}}
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
                               @click="openConfirm(tr)"
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
  import {getBarDebts} from "../../../../../stitch/api/debts";
  import eventBus from "../../../../../eventBus";
  import {getClient} from "../../../../../stitch/app";

  export default {
    name: "DebtsTable",
    data: () => (
      {
        debts: [],
        selected: {}
      }
    ),
    created() {

    },
    mounted() {
      this.getDebts()
    },
    methods: {
      getDebts() {
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        this.axios.get(getBarDebts).then((res) => {
          this.debts = res.data;
          console.log(res.data);
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
      totalAmount(tr) {
        let sorted = tr.products.map(item =>
          item.price * item.holding.$numberInt
        );
        return sorted.reduce((x, y) => x + y);
      },
      openConfirm(tr) {
        this.selected = tr;
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Confirm`,
          text: `Are you sure  you want to delete ${tr.name}[${tr.surety}] Debt?`,
          accept: this.acceptDelete
        });
      },
      acceptDelete() {
        let data = [{_id: this.selected._id}];
        this.$vs.loading({
          container: '#table-loader',
          type: 'sound',
          scale: 1
        });
        getClient().callFunction('DebtDelete', data).then((res) => {
            this.notify({text: 'Deleted Successful!!', title: '', color: 'success'});
            this.getDebts();
          console.log(res)
          }
        ).catch(
          (err) => {
            this.$vs.loading.close('#table-loader > .con-vs-loading');
            console.log(err)
          }
        )
      },
      status(tr) {
        return (tr.status) ? 'text-danger' : 'text-success';
      },
    }
  }
</script>

<style scoped>

</style>
