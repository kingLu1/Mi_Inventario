<template>
  <component :is="activeComponent" :purchasedProducts="purchasedProducts"/>
</template>

<script>
  import AddProducts from "./AddProducts";
  import Summary from "./Summary";

  import eventBus from "../../../../../eventBus";

  export default {
    data() {
      return {
        activeComponent: 'AddProducts',
        showAction: true,
        purchasedProducts: [],
      }
    },
    methods: {
      listener() {
        eventBus.$on('goToSummary', (payload) => {
          this.activeComponent = "Summary";
          this.purchasedProducts = payload
        });
        eventBus.$on('goToAddProducts', () => this.activeComponent = "AddProducts")
      }
    },
    components: {
      AddProducts, Summary
    },
    created() {
      this.listener()
    }
  }
</script>
<style lang="scss" scoped>

</style>
