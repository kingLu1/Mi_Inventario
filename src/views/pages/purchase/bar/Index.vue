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
        <tab-content title="Select Quantity" class="mb-5" icon="feather icon-image">
<!--          <div class="vx-row">-->
<!--            <div class="vx-col md:w-1/2 w-full">-->
<!--              <vs-input label="Event Name" v-model="eventName" class="w-full mt-5"/>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full">-->
<!--              <vs-select v-model="city" class="w-full select-large mt-5" label="Event Location">-->
<!--                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions"-->
<!--                                class="w-full"/>-->
<!--              </vs-select>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full mt-5">-->
<!--              <vs-select v-model="status" class="w-full select-large" label="Event Status">-->
<!--                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions"-->
<!--                                class="w-full"/>-->
<!--              </vs-select>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full md:mt-8">-->
<!--              <div class="demo-alignment">-->
<!--                <span>Requirements:</span>-->
<!--                <div class="flex">-->
<!--                  <vs-checkbox>Staffing</vs-checkbox>-->
<!--                  <vs-checkbox>Catering</vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </tab-content>
        <tab-content title="Check" class="mb-5" icon="feather icon-image">
<!--          <div class="vx-row">-->
<!--            <div class="vx-col md:w-1/2 w-full">-->
<!--              <vs-input label="Event Name" v-model="eventName" class="w-full mt-5"/>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full">-->
<!--              <vs-select v-model="city" class="w-full select-large mt-5" label="Event Location">-->
<!--                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions"-->
<!--                                class="w-full"/>-->
<!--              </vs-select>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full mt-5">-->
<!--              <vs-select v-model="status" class="w-full select-large" label="Event Status">-->
<!--                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions"-->
<!--                                class="w-full"/>-->
<!--              </vs-select>-->
<!--            </div>-->
<!--            <div class="vx-col md:w-1/2 w-full md:mt-8">-->
<!--              <div class="demo-alignment">-->
<!--                <span>Requirements:</span>-->
<!--                <div class="flex">-->
<!--                  <vs-checkbox>Staffing</vs-checkbox>-->
<!--                  <vs-checkbox>Catering</vs-checkbox>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </tab-content>
      </form-wizard>
    </div>
  </vx-card>

</template>

<script>
  import vSelect from 'vue-select'

  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  import SelectProducts from "./SelectProducts";
  import SelectQuantity from "./SelectQuantity";


  export default {
    data() {
      return {
        chips: []
      }
    },
    methods: {
      formSubmitted() {
        alert("Form submitted!");
      },

    },
    components: {
      FormWizard,
      TabContent,
      vSelect,
      SelectProducts,
      SelectQuantity


    }
  }
</script>
<style lang="scss" scoped>
  .actions {
    align-self: flex-end;
  }

</style>
