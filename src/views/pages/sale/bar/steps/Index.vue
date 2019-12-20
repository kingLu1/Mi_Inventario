<template>
  <component :is="activeComponent" :soldProducts="soldProducts"/>
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
        soldProducts: [],
      }
    },
    methods: {
      listener() {
        eventBus.$on('goToSummary', (payload) => {
          this.activeComponent = "Summary";
          this.soldProducts = payload
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
