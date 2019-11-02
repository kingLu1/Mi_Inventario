<template>
  <div class="vx-row">
    <date-picker class="mb-base"></date-picker>
    <component :is="activeComponent"/>
  </div>

</template>

<script>
    import datePicker from '../../../myComponents/DateRangePicker';
    import blank from '../../../myComponents/Blank';
    import bar from './bar/Bar';
    import bareque from "./barbeque/Barbeque";
    import pool from './pool/Pool';
    import kitchen from './kitchen/Kitchen'

    export default {
        name: "Report",
        components: {
            datePicker,
            bar,
            bareque,
            pool,
            kitchen,
            blank
        },
        data: () => ({
            activeComponent: bar
        })
    }
</script>

<style scoped>

</style>
