<template>
  <div class="vx-row">
    <div class="vx-col w-full h-full">
      <transition name="slide-fade">
        <date-picker :option="option" class="mb-base" @search="search" v-show="showDatePicker"/>
      </transition>
<!--      <transition name="slide-fade-updown">-->
        <component :is="activeComponent" :records="records" :date="date"/>
<!--      </transition>-->
    </div>
  </div>

</template>

<script>
  import datePicker from '../../../myComponents/DateRangePicker';
  import blank from '../../../myComponents/Blank';
  import barPurchase from './barPurchases/BarPurchaseIndex';
  import barSale from './barSales/BarSaleIndex';
  import barDebt from './barDebts/BarDebtIndex';
  import {getClient} from "../../../stitch/app";
  import eventBus from "../../../eventBus";

  export default {
    name: "Report",
    components: {
      datePicker,
      blank,
      barPurchase,
      barSale,
      barDebt


    },
    data: () => ({
      activeComponent: 'blank',
      records: [],
      date: {},
      showDatePicker: true,
      option: [
        {
          id: 1,
          slug: 'Bar~ Debts',
          outlet: 'bar',
          db: 'debts'
        },
        {
          id: 2,
          slug: 'Bar~ Purchases',
          outlet: 'bar',
          db: 'purchases'
        },
        {
          id: 3,
          slug: 'Bar~ Sales',
          outlet: 'bar',
          db: 'sales'
        },

      ]
    }),
    methods: {
      search(data) {
        this.date = {
          to: data.to,
          from: data.from
        };
        if (data.selected.id === 1) {
          this.switchedToBarDebt(data)
        } else if (data.selected.id === 2) {
          this.switchedToBarPurchase(data)
        } else if (data.selected.id === 3) {
          this.switchedToBarSale(data)
        }
      },
      switchedToBarDebt(data) {
        this.activeComponent = "barDebt";
        this.getRecord(data)
      },
      switchedToBarSale(data) {
        this.activeComponent = "barSale";
        this.getRecord(data)
      },
      switchedToBarPurchase(data) {
        this.activeComponent = "barPurchase";
        this.getRecord(data)
      },
      getRecord(data) {
        getClient().callFunction('GetRecord', [data]).then(
          res => {
            this.records = res;
            // console.log(res)
          }
        ).catch(
          err => {
            this.notify({text: err.message, title: 'Error', color: 'danger'})
          }
        )
      },
      listener() {
        eventBus.$on('showDatePicker', (p) => this.showDatePicker = p)
      },

    },
    mounted() {
      this.listener()
    }

  }
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .3s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-15px);
    opacity: 0;
  }



</style>

