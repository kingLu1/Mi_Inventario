<template>
  <component :is="activeComponent"
             :activeProduct="activeProduct"
             @backToTable="backToTable"
             @viewProductDetails="viewProductDetails"
             @openAddMultiplePage='openAddMultiplePage'/>
</template>

<script>
    import Table from './Product';
    import Detail from './ProductDetail';
    import Edit from './ProductEdit';
    import AddMultiple from './ProductAddMultiple';

    export default {
        name: "ProductIndex",
        components: {
            Table, Detail, Edit, AddMultiple
        },
        data: () => ({
            activeComponent: 'Table',
            activeProduct: null
        }),
        methods: {
            openAddMultiplePage() {
                this.activeComponent = 'AddMultiple';
            },
            viewProductDetails(p){
                this.activeProduct = p;
                this.activeComponent = "Detail"
            },
            backToTable() {
                this.activeComponent = "Table"

            }
        }
    }
</script>

<style scoped>

</style>
