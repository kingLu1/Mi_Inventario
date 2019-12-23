<template>
  <div>
    <div class="flex justify-start p-2" >
      <vx-tooltip text="Go Back" position="top" v-if="!showInnerAction">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="ml-2  border" @click="backToPurchasing()">
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
      <component :is="activeComponent" :activePurchase="activePurchase"/>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import HistoryTable from "./HistoryTable";
  import HistoryDetails from "./HistoryDetails";

  export default {
    name: "History",
    data: () => ({
      activeComponent: HistoryTable,
      activePurchase: '',
      showInnerAction: false
    }),
    created() {
      this.listener();
      eventBus.$emit('showActions', false)
    },
    beforeDestroy() {
      eventBus.$emit('showActions', true)
    },
    methods: {
      backToPurchasing() {
        eventBus.$emit('backToPurchasing')
      },
      goToTable(){
        this.activeComponent = "HistoryTable"
      },
      listener() {
        eventBus.$on('goToDetails', (payload) => {
          this.activePurchase = payload;
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
    components: {
      HistoryTable, HistoryDetails
    }
  }
</script>

<style scoped>

</style>
