<template>
  <component :is="activeComponent" :soldProducts="soldProducts" :summarizedData="summarizedData"/>
</template>

<script>
  import AddProducts from "./AddProducts";
  import Summary from "./Summary";
  import Submit from "./Submit";
  import Finish from "./Finish";

  import eventBus from "../../../../../eventBus";

  export default {
    data() {
      return {
        activeComponent: 'AddProducts',
        // activeComponent: 'Submit',
        showAction: true,
        soldProducts: [],
        summarizedData: []
      }
    },
    methods: {
      listener() {
        eventBus.$on('goToSummary', (payload) => {
          this.activeComponent = "Summary";
          this.soldProducts = payload
        });
        eventBus.$on('goToAddProducts', () => this.activeComponent = "AddProducts");
        eventBus.$on('goToSubmit', (payload) => {
          this.activeComponent = "Submit";
          this.summarizedData = payload
        });
        eventBus.$on('goToFinish', () => this.activeComponent = "Finish")
      },

    },
    components: {
      AddProducts, Summary, Submit, Finish
    },
    created() {
      this.listener()
    }
  }
</script>
<style lang="scss" scoped>

</style>
