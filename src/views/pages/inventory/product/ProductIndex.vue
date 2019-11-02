<template>
  <component :is="activeComponent"
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
            activeComponent: 'Table'
        }),
        methods: {
            openAddMultiplePage() {
                console.log('openAddMultiplePage');
                this.activeComponent = 'AddMultiple';
            }
        }
    }
</script>

<style scoped>

</style>
