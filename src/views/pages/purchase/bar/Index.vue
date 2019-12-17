<template>
  <vx-card>
    <div slot="no-body">
      <div class="flex justify-end p-2">
        <vx-tooltip text="Go Back" position="top">
          <vs-button icon-pack="feather" icon="icon-corner-up-left"
                     color="primary"
                     class="mr-2" @click="backToPurchasingMenu()">
            Back
          </vs-button>
        </vx-tooltip>
      </div>
      <form-wizard color="rgba(var(--vs-warning), 1)" :title="null" :subtitle="null" finishButtonText="Submit"
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
      backToPurchasingMenu() {
        eventBus.$emit('back')
      }


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
