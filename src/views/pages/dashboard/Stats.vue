<template>
  <div class="vx-row">
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/5 xl:w-1/5 mb-base">
      <vx-card class="overflow-hidden">
        <div class="font-semibold mb-2 text-uppercase"><span>DEBTS </span>
        </div>
        <div>
          <span class="mb-1 text-left text-danger">{{cash | currency}}</span>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/5 xl:w-1/5 mb-base">
      <vx-card class="overflow-hidden">
        <div class="font-semibold mb-2 text-uppercase"><span>LOSS </span>
        </div>
        <div>
          <span class="mb-1 text-left text-danger">{{cash | currency}}</span>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Stats",
    data() {
      return {
        cash: 100000
      }
    }
  }
</script>

<style scoped>

</style>
