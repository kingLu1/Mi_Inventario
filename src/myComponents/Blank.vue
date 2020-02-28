<template>
  <vx-card>
    <div class="loading_height flex justify-center items-center">
      <div class="flex items-center">
        <feather-icon icon="MehIcon" svgClasses="h-10 w-10"/>
        <p class="font-semibold ml-2">Do Something</p>

      </div>
    </div>
  </vx-card>
</template>

<script>
  export default {
    name: "Blank"
  }
</script>

<style scoped>
  .loading_height {
    height: 50vh;
  }
</style>
