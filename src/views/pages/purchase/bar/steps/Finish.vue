<template>
  <div class="p-base px-4 pt-2">
    <div class="flex justify-center pt-base">
      <h5>
        Purchase was Successfully Recorded
      </h5>
    </div>
    <vs-divider position="left-center">
    </vs-divider>
    <div class="flex justify-center">
      <vs-button
        color="primary" type="filled"
        class="ml-2 " @click="backToPurchasingMenu">
        Back to Purchase Menu
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
      backToPurchasingMenu() {
        eventBus.$emit('back')
      }
    }

  }
</script>

<style scoped>

</style>
