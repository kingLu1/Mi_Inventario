<template>
  <vx-card>
    <div class="h-screen flex w-full bg-img">
      <div
        class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
        <img src="../../../../assets/images/pages/404.png" alt="graphic-404" class="mx-auto mb-4">
        <h1 class="mb-12 text-5xl d-theme-heading-color">404 - Page Not Found!</h1>
        <p class="mb-16 d-theme-text-inverse">paraphonic unassessable foramination Caulopteris worral Spirophyton
          encrimson esparcet aggerate chondrule restate whistler shallopy biosystematy area bertram plotting unstarting
          quarterstaff.</p>
        <vs-button size="large" @click="backToPurchasingMenu()">Back to Home</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import eventBus from "../../../../eventBus";


  export default {
    name: "Index",
    data() {
      return {
        firstName: "",
        /// other data....
      }
    },
    methods: {
      backToPurchasingMenu() {
        eventBus.$emit('back')
      }
    },
    components: {
      FormWizard,
      TabContent
    }
  }
</script>
