<template>
  <div>
    <div class="flex justify-between p-2">
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
    <div>
      <component :is="activeComponent" :activeSales="activeSales"/>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import HistoryDetails from "./HistoryDetails";
  import HistoryTable from "./HistoryTable";

  export default {
    name: "History",
    components: {
      HistoryTable, HistoryDetails
    },
    created() {
      this.listener();
      eventBus.$emit('showActions', false)
    },
    beforeDestroy() {
      eventBus.$emit('showActions', true)
    },
    methods: {
      backToSales() {
        eventBus.$emit('backToSales')
      },
      goToTable() {
        this.activeComponent = "HistoryTable"
      },
      listener() {
        eventBus.$on('goToDetails', (payload) => {
          this.activeSales = payload;
          this.activeComponent = 'HistoryDetails'
        });
        eventBus.$on('backToHistoryTable', () => {
          this.activeComponent = 'HistoryTable'
        });
        eventBus.$on(
          "showInnerActions",
          (payload) => this.showInnerAction = payload
        );
      }
    },
    data: () => ({
      activeComponent: 'HistoryTable',
      activeSales: '',
      showInnerAction: false
    })
  }
</script>

<style scoped>

</style>
