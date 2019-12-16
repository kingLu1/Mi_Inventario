<template>
  <vx-card>
    <div slot="no-body">
      <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit"
                   @on-complete="formSubmitted">
        <tab-content title="Select Products" class="mb-5" icon="feather icon-plus">
          <!-- tab 1 content -->
          <select-products :chips="chips"/>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Select Quantity" class="mb-5" icon="feather icon-briefcase">
          <select-quantity :chips="chips"/>
        </tab-content>

        <!-- tab 3 content -->

        <tab-content title="Check" class="mb-5" icon="feather icon-image">
          <submit/>
        </tab-content>
      </form-wizard>
    </div>
  </vx-card>

</template>

<script>

  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  import SelectProducts from "./SelectProducts";
  import SelectQuantity from "./SelectQuantity";
  import Submit from "./Submit";

  import eventBus from "../../../../eventBus";

  export default {
    data() {
      return {
        chips: []
      }
    },
    methods: {
      formSubmitted() {
        eventBus.$emit('submit');
      },

    },
    components: {
      FormWizard,
      TabContent,
      SelectProducts,
      SelectQuantity,
      Submit


    }
  }
</script>
<style lang="scss" scoped>
  .actions {
    align-self: flex-end;
  }

</style>
