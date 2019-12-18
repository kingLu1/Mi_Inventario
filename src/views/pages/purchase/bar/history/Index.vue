<template>
  <div>
    <div class="flex justify-between p-2" >
      <vx-tooltip text="Go Back" position="top">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="ml-2  border" @click="backToPurchasing()">
          Back
        </vs-button>
      </vx-tooltip>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";

  export default {
    name: "History",
    created() {
      eventBus.$emit('showActions', false)
    },
    beforeDestroy() {
      eventBus.$emit('showActions', true)
    },
    methods:{
      backToPurchasing(){
        eventBus.$emit('backToPurchasing')
      }
    }
  }
</script>

<style scoped>

</style>
