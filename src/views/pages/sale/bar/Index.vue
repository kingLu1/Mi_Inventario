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
<!--      <form-wizard v-if="!isSubmit" color="rgba(var(&#45;&#45;vs-warning), 1)" :title="null" :subtitle="null"-->
<!--                   finishButtonText="Submit"-->
<!--                   @on-complete="formSubmitted">-->
<!--        <tab-content title="Select Products" class="mb-5" icon="feather icon-plus">-->
<!--          &lt;!&ndash; tab 1 content &ndash;&gt;-->
<!--          <select-products :chips="chips"/>-->
<!--        </tab-content>-->

<!--        &lt;!&ndash; tab 2 content &ndash;&gt;-->
<!--        <tab-content title="Select Quantity" class="mb-5" icon="feather icon-briefcase">-->
<!--          <select-quantity :chips="chips"/>-->
<!--        </tab-content>-->

<!--        &lt;!&ndash; tab 3 content &ndash;&gt;-->

<!--        <tab-content title="Check" class="mb-5" icon="feather icon-image">-->
<!--          <submit/>-->
<!--        </tab-content>-->
<!--      </form-wizard>-->
      <finish v-if="isSubmit"/>

    </div>
  </vx-card>

</template>

<script>

  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  import SelectProducts from "./SelectProducts";
  import SelectQuantity from "./SelectQuantity";
  import Submit from "./Submit";
  import Finish from "./Finish";

  import eventBus from "../../../../eventBus";

  export default {
    data() {
      return {
        chips: [],
        isSubmit: false,
      }
    },
    methods: {
      formSubmitted() {
        eventBus.$emit('submit');

      },
      backToPurchasingMenu() {
        eventBus.$emit('back')
      },
      listener() {
        eventBus.$on('formSubmitted', () => this.isSubmit = true)
      }


    },
    components: {
      FormWizard,
      TabContent,
      SelectProducts,
      SelectQuantity,
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
