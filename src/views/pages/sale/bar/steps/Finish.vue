<template>
  <div class="p-base px-4 pt-2">
    <div class="flex justify-center pt-base">
      <h5>
        Sales was Recorded Successfully
      </h5>
    </div>
    <vs-divider position="left-center">
    </vs-divider>
    <div class="flex justify-center">
      <vs-button
        color="primary" type="filled"
        class="ml-2 " @click="backToSalesMenu">
        Back to Sales Menu
      </vs-button>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";

  export default {
    name: "Finish",
    created() {
      eventBus.$emit('showActions', false)
    },
    beforeDestroy() {
      eventBus.$emit('showActions', true)
    },
    methods: {
      backToSalesMenu() {
        eventBus.$emit('back')
      }
    }

  }
</script>

<style scoped>

</style>
