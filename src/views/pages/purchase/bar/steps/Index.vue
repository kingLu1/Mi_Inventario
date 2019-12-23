<template>
  <component :is="activeComponent" :purchasedProducts="purchasedProducts" :summarizedData="summarizedData"/>
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
        showAction: true,
        purchasedProducts: [],
        summarizedData: ''
      }
    },
    methods: {
      listener() {
        eventBus.$on('goToSummary', (payload) => {
          this.activeComponent = "Summary";
          this.purchasedProducts = payload
        });
        eventBus.$on('backToSummary', (payload) => {
          this.activeComponent = "Summary";
          this.purchasedProducts = payload
        });
        eventBus.$on('goToSubmit', (payload) => {
          this.activeComponent = "Submit";
          this.summarizedData = payload
        });
        eventBus.$on('goToAddProducts', () => this.activeComponent = "AddProducts");
        eventBus.$on('goToFinish', () => this.activeComponent = "Finish")
      }
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
