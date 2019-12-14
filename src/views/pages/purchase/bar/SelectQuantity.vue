<template>
  <div class="vx-row">
    <div class="vx-row flex justify-center">
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3  xl:w-1/3 mt-5">
        <div class="vx-row flex">
          <div class="centerx">
            <!--            <vs-input-number v-model="" label="passengers:"/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectQuantity",
    props: {
      chips: {
        required: true
      }
    },
  }
</script>

<style scoped>

</style>
