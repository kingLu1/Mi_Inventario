<template>
  <component :is="activeComponent"
             @view="viewDetail"/>
</template>

<script>
    import Table from './VendorTable'
    import Details from './VendorDetail'

    export default {
        name: "Vendor",
        data: () => ({
            activeComponent: Table
        }),
        components: {
            Table,
            Details
        },
        methods: {
            viewDetail(){
                this.activeComponent = Details
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
