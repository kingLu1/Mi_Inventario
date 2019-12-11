<template>
  <component :is="activeComponent"
             @view="viewDetail"
             @backToTable="viewTable"
             :activeVendor=activeVendor
  />
</template>

<script>
    import Table from './VendorTable'
    import Details from './VendorDetail'

    export default {
        name: "Vendor",
        data: () => ({
            activeComponent: Table,
            activeVendor: {}
        }),
        components: {
            Table,
            Details
        },
        methods: {
            viewDetail(tr) {
                this.activeVendor = tr;
                this.activeComponent = "Details"
            },
            viewTable() {
                this.activeComponent = "Table"
            }
        }
    }
</script>

<style scoped>

</style>
