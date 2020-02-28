<template>
  <vx-card>
    <div class="vx-row flex ">
      <div class="vx-col mb-2 w-full sm:w-1/2 md:1/2 lg:w-1/4 xl:w-1/5">
        <div class="mb-2">
          <p>Select Outlet<span class="text-danger ml-1">*</span></p>
        </div>
        <v-select label="slug" v-model="selected" :options="option" style="width:196px;"/>
      </div>
      <div class="vx-col mb-2 flex w-full sm:1/2 md:w-2/4 lg:w-1/4 xl:w-1/5">
        <div>
          <div class="mb-2">
            <!--            label-->
            <p>From<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr :config="configFromdateTimePicker" v-model="fromDate" placeholder="Select Date"
                      @on-change="onFromChange"/>
        </div>
      </div>
      <div class="vx-col mb-2 flex w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5">
        <div>
          <div class="mb-2">
            <p>To<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr :config="configTodateTimePicker" v-model="toDate" placeholder="Select Date"
                      @on-change="onToChange"/>
        </div>
      </div>
      <div class="vx-col actions mt-2 pb-3 flex w-full h-full sm:w-full md:w-full lg:w-1/4 xl:w-1/5">
        <div class="flex flex-wrap">
          <vs-button @click="search()" color="primary" type="filled" icon-pack="feather" icon="icon-search"
                     class="mr-2">
            Search
          </vs-button>
        </div>
      </div>
    </div>

  </vx-card>


</template>

<script>
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    name: "DateRangePicker",
    props: {
      option: {
        required: true
      }
    },
    data() {
      return {
        selected: '',
        fromDate: null,
        toDate: null,
        configFromdateTimePicker: {
          minDate: null,
          maxDate: null
        },
        configTodateTimePicker: {
          minDate: null
        },
      }
    },
    methods: {
      onFromChange(selectedDates, dateStr, instance) {
        this.$set(this.configTodateTimePicker, 'minDate', dateStr);
      },
      onToChange(selectedDates, dateStr, instance) {
        this.$set(this.configFromdateTimePicker, 'maxDate', dateStr);
      },
      search() {
        let data = {
          a: this.selected,
          b: this.toDate,
          c: this.fromDate
        }

        console.log(data)
      },
      downloadReport() {
        console.log('download')


      }

    },
    components: {
      flatPickr,
      vSelect
    }
  }
</script>

<style lang="scss" scoped>
  .actions {
    align-self: flex-end;
  }

</style>
