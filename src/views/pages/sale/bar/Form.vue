<template>
  <div>
    <form-wizard v-if="!isSubmit" color="rgba(var(--vs-warning), 1)" :title="null" :subtitle="null"
                 finishButtonText="Submit"
                 @on-complete="formSubmitted">
      <tab-content title="Select Products and Add Quantity Sold" class="mb-5" icon="feather icon-plus">
        <!-- tab 1 content -->
        <select-products :chips="chips" :soldProducts="soldProducts"/>
      </tab-content>

      <tab-content title="Check" class="mb-5" icon="feather icon-image">
        <submit :soldProducts="soldProducts"/>
      </tab-content>
    </form-wizard>
    <finish v-if="isSubmit"/>
  </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  import SelectProducts from "./SelectProducts";
  import Submit from "./Submit";
  import Finish from "./Finish";
  import eventBus from "../../../../eventBus";

  export default {
    name: "Form",
    data() {
      return {
        chips: [],
        soldProducts: [],
        isSubmit: false,
      }
    },
    methods: {
      formSubmitted() {
        eventBus.$emit('submit');

      },
      listener() {
        eventBus.$on('formSubmitted', () => this.isSubmit = true)
      }


    },
    components: {
      FormWizard,
      TabContent,
      SelectProducts,
      Submit, Finish


    },
    created() {
      this.listener()
    }
  }
</script>
<style lang="scss" scoped>
  .actions {
    align-self: flex-end;
  }

</style>
