<template>
  <div class="p-base px-4 pt-2 vs-con-loading__container" id="table-loader">
    <vs-divider position="left-center">
      <h4 class="font-semibold">Sales Review</h4>
    </vs-divider>
    <div class="vx-row mb-base">
      <div class="vx-col w-2/3 pl-6">
        <div class="vx-row">
          <div class="vx-col w-1/2">
            <div class="mt-2 ">
              <div class="mb-1">
                <p style="font-size: .85rem;">Sales Date<span class="text-danger ml-1">*</span></p>
              </div>
              <flat-pickr name="Sales Date" style="width: 100%" v-validate="'required'" v-model="sales.date"
                          placeholder="Select Date"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('Sales Date')">{{ errors.first('Sales Date') }}</span>
            </div>
          </div>
          <div class="vx-col w-1/2">
            <div class="mt-2">
              <vs-input label="Cash Remit(₦)"
                        name="Cash Remit"
                        v-validate="'required|numeric'"
                        placeholder="Remit"
                        v-model="sales.cash_remitted"
                        data-vv-validate-on="blur"
                        class=" w-full"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('Cash Remit')">{{ errors.first('Cash Remit') }}</span>
            </div>
          </div>
          <div class="vx-col w-1/2">
            <div class="mt-2">
              <vs-input label="Credit Remit(₦)"
                        name="Credit Remit"
                        v-validate="'required|numeric'"
                        placeholder="Credit"
                        v-model="sales.credit_remitted"
                        data-vv-validate-on="blur"
                        class=" w-full"/>
              <span class="text-danger text-sm"
                    v-show="errors.has('Credit Remit')">{{ errors.first('Credit Remit') }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <vs-checkbox v-model="debtor">Debtor</vs-checkbox>
          <vx-card no-shadow card-border class="mt-4" v-if="debtor">
            <div slot="no-body">
              <div class="p-2 vx-row">
                <div class="vx-col w-1/2">
                  <vs-input label="Debtor"
                            name="Debtor Name"
                            v-validate="'required'"
                            placeholder="Name"
                            v-model="activeDebtor.name"
                            data-vv-validate-on="blur"
                            class="w-full "/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('Debtor Name')">{{ errors.first('Debtor Name') }}</span>
                </div>
                <div class="vx-col w-1/2">
                  <vs-input label="Surety"
                            name="Surety"
                            v-validate="'required'"
                            placeholder="Employee"
                            v-model="activeDebtor.surety"
                            data-vv-validate-on="blur"
                            class=" w-full"/>
                  <span class="text-danger text-sm"
                        v-show="errors.has('Debtor Name')">{{ errors.first('Debtor Name') }}</span>
                </div>
                <div class="vx-col w-1/2 mt-4 pr-4">
                  <div class="mb-1">
                    <p style="font-size: .85rem;">Products(s)<span class="text-danger ml-1">*</span></p>
                  </div>

                  <multiselect v-model="activeSelected" :options="allProducts"
                               :multiple="true" :close-on-select="false"
                               deselect-label="remove"
                               :max="5"
                               :clear-on-select="false" :preserve-search="true"
                               placeholder="Select Product" selectLabel='select'
                               label="name" track-by="name"
                  />
                  <br>
                </div>
                <div class="vx-col w-1/2 p-2 flex items-center">
                  <vs-button color="primary" type="filled"
                             icon-pack="feather" icon="icon-plus"
                             class="mr-2 round"
                             @click="addDebt">
                  </vs-button>
                </div>
                <div class="vx-col w-full" v-for="debt in debtors" v-if="debtors.length">
                  <vs-divider color="primary" class="m-0 pb-2"/>
                  <div class="flex justify-between items-center">
                    <h6>
                      {{debt.name}} ({{debt.surety}})
                    </h6>
                    <vs-button size="small" color="danger" type="border" icon-pack="feather" icon="icon-x"
                               class="mr-2 round" @click="remove(debt)">
                    </vs-button>
                  </div>
                  <div class="vx-row flex items-center" v-for="product in debt.products">
                    <div class="vx-col w-1/4">
                      <p>{{product.product}}</p>
                    </div>
                    <div class="vx-col w-1/4">
                      <p>{{product.price | currency}}</p>
                    </div>
                    <div class="vx-col w-1/4">
                      <number-input v-model="product.holding" :min="0" :max="product.inStock" inline controls center
                                    size="small"/>

                      <!--                      <number-input v-model="product.holding" :min="1" inline controls center size="small"/>-->
                    </div>
                    <div class="vx-col w-1/4">
                      <p class="money">{{product.price * product.holding | currency}}</p>
                    </div>
                  </div>
                  <div class="vx-row flex items-center">
                    <div class="vx-col w-1/4">

                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                      <p class="money font-bold">{{getTotalDebt(debt) | currency}}</p>
                    </div>

                  </div>
                </div>
              </div>
              <div class="vx-row py-5" v-if="debtors.length">
                <div class="vx-col w-full flex justify-end">
                  <!--                      <vs-divider color="primary" class="m-0 pb-2"/>-->
                  <vs-button size="small" color="danger" icon-pack="feather" icon="icon-check" type="filled"
                             class="mr-2 round" @click="debtor = false">
                    Confirm All
                  </vs-button>
                </div>

              </div>
            </div>
          </vx-card>

        </div>
        <div class="mt-4">
          <vs-checkbox v-model="badProduct">Broken/Faulty Product(s)</vs-checkbox>
          <vx-card no-shadow card-border class="mt-4" v-if="badProduct">
            <div slot="no-body">
              <div class="p-2 vx-row">
                <div class="vx-col w-1/2 mt-4 pr-4">
                  <div class="mb-1">
                    <p style="font-size: .85rem;">Products(s)<span class="text-danger ml-1">*</span></p>
                  </div>

                  <multiselect v-model="activeBadSelected" :options="allProducts"
                               :multiple="true" :close-on-select="true"
                               deselect-label="remove"
                               :clear-on-select="false" :preserve-search="true"
                               placeholder="Select Product" selectLabel='select'
                               label="name" track-by="name"
                  />

                  <br>

                </div>
                <div class="vx-col w-1/2 p-2 flex items-center">
                  <vs-button color="primary" type="filled"
                             icon-pack="feather" icon="icon-plus"
                             class="mr-2 round"
                             @click="addBadProduct">
                  </vs-button>
                </div>
                <div class="vx-col w-full" v-if="badProducts.length">
                  <vs-divider color="primary" class="m-0 pb-2"/>
                  <div class="flex justify-between items-center">
                    <h6>
                      Selected Bad Products
                    </h6>

                  </div>
                  <div class="vx-row flex items-center" v-for="bad in badProducts">
                    <div class="vx-col w-1/5">
                      <p>{{bad.product}}</p>
                    </div>
                    <div class="vx-col w-1/5">
                      <p>{{bad.price | currency}}</p>
                    </div>
                    <div class="vx-col w-1/5">
                      <number-input v-model="bad.bad" :min="1" :max="bad.inStock" inline controls center size="small"/>
<!--                      <vs-input-number v-model="bad.bad" color="dark"/>-->
                    </div>
                    <div class="vx-col w-1/5 flex justify-center">
                      <p class="money">{{bad.price * bad.bad | currency}}</p>
                    </div>
                    <div class="vx-col w-1/5">
                      <vs-button size="small" color="danger" type="border" icon-pack="feather" icon="icon-x"
                                 class="mr-2 round" @click="removeBadProduct(bad)">
                      </vs-button>
                    </div>
                  </div>
                  <div class="vx-row flex items-center">
                    <div class="vx-col w-1/4">

                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                      <!--                      <p class="money font-bold">{{getTotalDebt(product) | currency}}</p>-->
                    </div>

                  </div>
                </div>
              </div>
              <div class="vx-row py-5" v-if="badProducts.length">
                <div class="vx-col w-full flex justify-end">
                  <!--                      <vs-divider color="primary" class="m-0 pb-2"/>-->
                  <vs-button size="small" color="danger" icon-pack="feather" icon="icon-check" type="filled"
                             class="mr-2 round" @click="badProduct = false">
                    Confirm All
                  </vs-button>
                </div>

              </div>
            </div>
          </vx-card>
        </div>
        <div class="mt-4">
          <vs-checkbox v-model="debtPaid">Debt Paid</vs-checkbox>
          <vx-card no-shadow card-border class="mt-4" v-if="debtPaid">
            <div slot="no-body">
              <div class="p-2 vx-row">
                <div class="vx-col w-1/2 mt-4 pr-4">
                  <div class="mb-1">
                    <p style="font-size: .85rem;">Debtors(s)<span class="text-danger ml-1">*</span></p>
                  </div>

                  <multiselect v-model="activeDebtPaidSelected" :options="holdingDebts"
                               :multiple="true" :close-on-select="true"
                               deselect-label="remove"
                               :custom-label="debtorsWithSuretyAndDate"
                               :clear-on-select="false" :preserve-search="true"
                               placeholder="Select Debtor" selectLabel='Paid'
                               label="name" track-by="name"
                  />

                  <br>

                </div>
                <div class="vx-col w-1/2 p-2 flex items-center">
                  <vs-button color="primary" type="filled"
                             icon-pack="feather" icon="icon-plus"
                             class="mr-2 round"
                             @click="addDebtPaid">
                  </vs-button>
                </div>
                <div class="vx-col w-full" v-if="debtsPaid.length">
                  <vs-divider color="primary" class="m-0 pb-2"/>
                  <div class="flex justify-between items-center">
                    <h6>
                      Selected Paid Debts
                    </h6>

                  </div>
                  <div class="vx-row flex items-center" v-for="debtP in debtsPaid">
                    <div class="vx-col w-1/5">
                      <p>{{debtP.name}}[{{debtP.surety}}]</p>
                    </div>
                    <div class="vx-col w-1/5">
                      <p>{{debtorTotalDebts(debtP) | currency}}</p>
                    </div>
                    <div class="vx-col w-2/5">
                      <p>{{debtP.date}}</p>
                    </div>
                    <div class="vx-col w-1/5">
                      <vs-button size="small" color="danger" type="border" icon-pack="feather" icon="icon-x"
                                 class="mr-2 round" @click="removeDebtsPaid(debtP)">
                      </vs-button>
                    </div>
                  </div>
                  <div class="vx-row flex items-center">
                    <div class="vx-col w-1/4">

                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                    </div>
                    <div class="vx-col w-1/4">
                      <!--                      <p class="money font-bold">{{getTotalDebt(product) | currency}}</p>-->
                    </div>

                  </div>
                </div>
              </div>
              <div class="vx-row py-5" v-if="debtsPaid.length">
                <div class="vx-col w-full flex justify-end">
                  <!--                      <vs-divider color="primary" class="m-0 pb-2"/>-->
                  <vs-button size="small" color="danger" icon-pack="feather" icon="icon-check" type="filled"
                             class="mr-2 round" @click="debtPaid = false">
                    Confirm All
                  </vs-button>
                </div>

              </div>
            </div>
          </vx-card>
        </div>
      </div>


      <div class="vx-col w-1/3 flex justify-center">
        <div class="mt-5 ">
          <h5 class="pt-2" v-if="sales.date">Sales Date : <span>{{sales.date}}</span></h5>
          <h5 class="pt-2">Sales Total : <span class="money">{{summarizedData.total | currency}}</span></h5>
          <h5 class="pt-2" v-if="sales.cash_remitted">Remitted Cash : <span class="money">{{sales.cash_remitted | currency}}</span>
          </h5>
          <h5 class="pt-2" v-if="sales.credit_remitted">Credit : <span class="money">{{sales.credit_remitted | currency}}</span>
          </h5>
          <div v-if="!debtor && debtors.length">
            <h5 class="pt-2">Debt</h5>
            <h6 class="pt-1" v-for="debt in debtors">
              {{debt.name}}({{debt.surety}}) : <span class="text-danger">{{getTotalDebt(debt) | currency}}</span>
            </h6>
          </div>

          <div v-if="!badProduct && badProducts.length">
            <h5 class="pt-2">Bad Products</h5>
            <h6 class="pt-1" v-for="bad in badProducts">
              {{bad.product}} : <span class="text-danger">{{bad.bad * bad.price | currency}}</span>
            </h6>
          </div>
          <div v-if="!debtPaid && debtsPaid.length">
            <h5 class="pt-2">Debt(s) Paid</h5>
            <h6 class="pt-1" v-for="debt in debtsPaid">
              {{debt.name}}[{{debt.surety}}] : <span class="money">{{debtorTotalDebts(debt) | currency}}</span>
            </h6>
          </div>
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
  import {getBarUnpaidDebts} from "../../../../../stitch/api/debts";
  import {mapState} from "vuex";
  import eventBus from "../../../../../eventBus";
  import {getClient} from "../../../../../stitch/app";
  import flatPickr from "vue-flatpickr-component";
  import 'flatpickr/dist/flatpickr.css';
  import vSelect from 'vue-select';
  import {getProducts} from "../../../../../stitch/api/inventory";

  export default {
    name: "Submit",
    components: {
      flatPickr, vSelect
    },
    props: {
      summarizedData: {
        required: true
      }
    },
    data: () => ({
      allProducts: [],
      activeSelected: [],
      sales: {
        date: '',
        cash_remitted: '',
        credit_remitted: '',
        created_on: Date(),
      },
      activeDebtor: {
        status: true
      },
      debtor: false,
      debtors: [],
      badProduct: false,
      activeBadSelected: [],
      badProducts: [],
      debtPaid: false,
      debtsPaid: [],
      holdingDebts: [],
      activeDebtPaidSelected: []
    }),
    computed: {
      ...mapState(['AppActiveUser'])
    },
    watch: {},
    created() {

    },
    mounted() {
      this.sales.created_by = this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name;
      this.getProducts();
      this.getDebts()
    },
    methods: {
      removeBadProduct(item) {
        this.badProducts.splice(this.badProducts.indexOf(item), 1);
      },
      addBadProduct() {
        this.badProducts = this.activeBadSelected.map(
          (item) => {
            return {
              product_id: item._id,
              product: item.name,
              price: item.selling_price,
              bad: 0
            }
          }
        );
        // this.activeBadSelected = []

      },
      addDebt() {
        let debt = {
          date: Date(), ...this.activeDebtor, products: this.activeSelected.map(
            (item) => {
              return {
                product_id: item._id,
                product: item.name,
                price: item.selling_price,
                holding: 0,
                inStock: item.inStock
              }
            }
          )
        };
        this.debtors.push(debt);
        this.activeDebtor = {status: true};
        this.activeSelected = [];
      },
      back() {
        eventBus.$emit('goToSummary', this.summarizedData.soldProducts)
      },
      getProducts() {

        this.axios.get(getProducts).then((res) => {
          this.allProducts = res.data;
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });

        });
      },
      getTotalDebt(p) {
        let sortedArray = p.products.map(item =>
          item.price * item.holding
        );
        // this.getTotal()
        return sortedArray.reduce((x, y) => x + y)

      },
      remove(item) {
        this.debtors.splice(this.debtors.indexOf(item), 1);
      },
      submit() {
        this.$validator.validateAll().then(result => {
            if (result) {
              if (!this.debtor) {
                if (!this.badProduct) {
                  this.$vs.loading({
                    container: '#table-loader',
                    type: 'sound',
                    scale: 1
                  });
                  let sales = Object.assign(this.sales, this.summarizedData);
                  let data = {
                    sale: sales,
                    debtors: this.debtors,
                    badProducts: this.badProducts,
                    debts: !!(this.debtors.length),
                    debtPaid: !!(this.debtsPaid.length),
                    debtorPaid: this.debtsPaid
                  };
                  console.log(data);
                  getClient().callFunction('SalesBar', [data]).then(
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
                  this.notify({
                    text: "Confirm Bad Products",
                    color: "warning",
                    title: "Warning"
                  })
                }
              } else {
                this.notify({
                  text: "Confirm Debtor",
                  color: "warning",
                  title: "Warning"
                })
              }

            } else {
              // err
            }
          }
        )
      },
      debtorsWithSuretyAndDate({name, surety, products, date}) {
        let sorted = products.map(item =>
          item.price * item.holding.$numberInt
        );
        let amount = sorted.reduce((x, y) => x + y);
        return `${name}[${surety}] - ‎₦${amount} on ${date}`
      },
      getDebts() {
        this.axios.get(getBarUnpaidDebts).then((res) => {
          this.holdingDebts = res.data;
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
      addDebtPaid() {
        this.debtsPaid = this.activeDebtPaidSelected.map(
          (item) => {
            return {
              debt_id: item._id,
              status: false,
              name: item.name,
              surety: item.surety,
              products: item.products,
              date_paid: Date(),
              date: item.date
            }
          }
        );
        this.activeDebtPaidSelected = []
      },
      removeDebtsPaid(item) {
        this.debtsPaid.splice(this.debtsPaid.indexOf(item), 1);
      },
      debtorTotalDebts(debt) {
        let sorted = debt.products.map(item =>
          item.price * item.holding.$numberInt
        );
        return sorted.reduce((x, y) => x + y);
      },
      removeMaxNumber() {

      }

    },


  }
</script>

<style scoped lang="scss">
  @import "~vue-multiselect/dist/vue-multiselect.min.css";
</style>
