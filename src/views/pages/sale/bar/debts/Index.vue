<template>
  <div>
    <div class="flex justify-between p-2" >
      <vx-tooltip text="Go Back" position="top" v-if="!showInnerAction">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="ml-2  border" @click="backToSales()">
          Back
        </vs-button>
      </vx-tooltip>
      <vx-tooltip text="Go Back" position="top" v-if="showInnerAction">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="ml-2  border" @click="goToTable()">
          Back to Table
        </vs-button>
      </vx-tooltip>
    </div>
    <component :is="activeComponent" :activeDebt="activeDebt"/>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import DebtsDetails from "./DebtsDetails";
  import DebtsTable from "./DebtsTable";

  export default {
    name: "Index",
    created() {
      this.listener();
      eventBus.$emit('showDebtButton', false)
    },
    destroyed() {
      eventBus.$emit('showDebtButton', true)
    },
    components: {
      DebtsTable, DebtsDetails
    },
    data: () => ({
      activeComponent: 'DebtsTable',
      activeDebt: '',
      showInnerAction: false
    }),
    methods: {
      backToSales() {
        eventBus.$emit('backToSales')
      },
      goToTable() {
        this.activeComponent = "DebtsTable"
      },
      listener() {
        eventBus.$on('goToDetails', (payload) => {
          this.activeDebt = payload;
          this.activeComponent = 'DebtsDetails';
        });
        eventBus.$on('backToDebtsTable', () => {
          this.activeComponent = 'DebtsTable'
        });
        eventBus.$on(
          "showInnerActions",
          (payload) => this.showInnerAction = payload
        );
      }
    },

  }
</script>

<style scoped>

</style>
