<template>
</template>

<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'

    export default {
        name: "Bar",
        data() {
            return {
                firstName: "",
                /// other data....
            }
        },
        methods: {},
        components: {
            FormWizard,
            TabContent
        }
    }
</script>
