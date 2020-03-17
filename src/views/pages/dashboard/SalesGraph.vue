<template>
  <vx-card title="Sales">
    <template slot="actions">
      <span class="text-grey">1 day ago</span>
    </template>
    <days></days>
  </vx-card>
</template>

<script>
  import days from './7days/Index';
  import monthly from './Monthly/Index';

  export default {
    name: "SalesGraph",
    components: {
      days, monthly
    }

  }
</script>

<style scoped>

</style>
