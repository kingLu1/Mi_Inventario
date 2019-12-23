<template>
  <div class="p-base px-4 pt-2 vs-con-loading__container" id="table-loader" >
    <vs-divider position="left-center">
      <h4 class="font-semibold">Purchase Review</h4>
    </vs-divider>
    <div class="vx-row mb-base">
      <div class="vx-col w-1/3 pl-6">
        <div class="mt-2">
          <div class="mb-1">
            <p style="font-size: .85rem;">Purchase Date<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr name="Purchase Date" style="width: 100%" v-validate="'required'" v-model="purchase.date"
                      placeholder="Select Date"/>
          <span class="text-danger text-sm"
                v-show="errors.has('Purchase Date')">{{ errors.first('Purchase Date') }}</span>
        </div>
        <div class="mt-2">
          <vs-input label="Paid(₦)"
                    name="Purchase Price"
                    v-validate="'required|numeric'"
                    placeholder="Total amount"
                    v-model="purchase.paid"
                    data-vv-validate-on="blur"
                    class=" w-full"/>
          <span class="text-danger text-sm"
                v-show="errors.has('Purchase Price')">{{ errors.first('Purchase Price') }}</span>
        </div>
        <div class="mt-2">
          <vs-textarea label="Remark" v-model="purchase.paidRemark" height="100"/>
        </div>
        <div class="mt-2">
          <vs-input label="Expense(₦)"
                    name="Expense"
                    v-validate="'numeric'"
                    v-model="purchase.expense"
                    placeholder="Expense"
                    data-vv-validate-on="blur"
                    class=" w-full"/>
          <span class="text-danger text-sm" v-show="errors.has('Expense')">{{ errors.first('Expense') }}</span>

        </div>
        <div class="mt-2">
          <vs-textarea v-model="purchase.expenseRemark" label="Expense Remark" height="100"/>
        </div>

      </div>
      <div class="vx-col w-2/3 flex justify-center">
        <div class="mt-5 ">
          <h4 class="pt-2" v-if="purchase.date">Purchased Date : <span>{{purchase.date}}</span></h4>
          <h4 class="pt-2">Calculated Total : <span class="money">{{summarizedData.total | currency}}</span></h4>
          <h4 class="pt-2" v-if="purchase.paid">Paid Total : <span class="money">{{purchase.paid | currency}}</span>
          </h4>
          <h5 class="pt-2" v-if="purchase.paidRemark">Purchase Remark : <span>{{purchase.paidRemark}}</span></h5>
          <h4 class="pt-2" v-if="purchase.expense">Expense : <span class="money">{{purchase.expense | currency}}</span>
          </h4>
          <h5 class="pt-2" v-if="purchase.expenseRemark">Expense Remark : <span>{{purchase.expenseRemark}}</span></h5>
        </div>
        <div class="mt-5 ">

        </div>
      </div>

    </div>

    <div class="flex justify-between">
      <vs-button
        color="warning" type="filled"
        @click="back"
        class="ml-2 ">
        Back
      </vs-button>
      <vs-button
        color="warning" type="filled"
        @click="submit"
        class="ml-2 ">
        Submit
      </vs-button>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import {getClient} from '../../../../../stitch/app';
  import {mapState} from "vuex";
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


  export default {
    name: "Submit",
    props: {
      summarizedData: {
        required: true
      }
    },
    data: () => ({
      purchase: {
        date: '',
        paid: null,
        paidRemark: '',
        expense: '',
        expenseRemark: '',
        created_on: Date(),
      },
    }),
    components: {
      flatPickr
    },
    computed: {
      ...mapState(['AppActiveUser'])
    },
    created() {

    },
    mounted() {
      this.purchase.created_by = this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name

    },
    watch: {},
    methods: {
      back() {
        eventBus.$emit('backToSummary', this.summarizedData.purchasedProducts)
      },
      submit() {
        this.$validator.validateAll().then(result => {
            if (result) {
              this.$vs.loading({
                container: '#table-loader',
                type: 'sound',
                scale: 1
              });
              let purchase = Object.assign(this.purchase, this.summarizedData);
              getClient().callFunction('PurchaseBar', [purchase]).then(
                res => {
                  this.$vs.loading.close('#table-loader > .con-vs-loading');
                  eventBus.$emit("goToFinish");
                  this.notify({text: 'Successful', title: '', color: 'success'});
                }
              ).catch(
                err => {
                  this.$vs.loading.close('#table-loader > .con-vs-loading');
                  this.notify({text: err.message, title: 'Error', color: 'danger'})
                }
              )
            } else {
              // err
            }
          }
        )
      },
    }
  }
</script>

<style scoped>

</style>
