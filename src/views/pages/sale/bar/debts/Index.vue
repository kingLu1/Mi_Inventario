<template>

</template>

<script>
  import eventBus from "../../../../../eventBus";

  export default {
    name: "Index",
    created() {
      eventBus.$emit('showDebtButton', false)
    },
    destroyed() {
      eventBus.$emit('showDebtButton', true)
    }
  }
</script>

<style scoped>

</style>
