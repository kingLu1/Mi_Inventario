<template>
  <vx-card>
    <div class="vx-row flex ">
      <div class="vx-col mb-2 w-full sm:w-1/2 md:1/2 lg:w-1/4 xl:w-1/5">
        <div class="mb-2">
          <p>Select Outlet<span class="text-danger ml-1">*</span></p>
        </div>
        <v-select label="slug" v-model="selected" :options="option"
                  style="width:196px;"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Outlet')">{{ errors.first('Outlet') }}</span>

      </div>
      <div class="vx-col mb-2 flex w-full sm:1/2 md:w-2/4 lg:w-1/4 xl:w-1/5">
        <div>
          <div class="mb-2">
            <!--            label-->
            <p>From<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr name="From Date" v-validate="'required'" :config="configFromdateTimePicker" v-model="fromDate"
                      placeholder="Select Date"
                      @on-change="onFromChange"/>
          <div>
             <span class="text-danger text-sm"
                   v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
          </div>
        </div>
      </div>
      <div class="vx-col mb-2 flex w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5">
        <div>
          <div class="mb-2">
            <p>To<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr name="To Date" :config="configTodateTimePicker" v-model="toDate" placeholder="Select Date"
                      v-validate="'required'"
                      @on-change="onToChange"/>
          <div>
             <span class="text-danger text-sm"
                   v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
          </div>

        </div>
      </div>
      <div class="vx-col actions mt-2 pb-2 pt-1 flex w-full h-full sm:w-full md:w-full lg:w-1/4 xl:w-1/5">
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
        this.$validator.validateAll().then(result => {
            if (result) {
              let data = {
                selected: this.selected,
                to: this.toDate,
                from: this.fromDate
              };
              this.$emit('search', data)
            } else {
              // err
            }
          }
        )
      },
      // downloadReport() {
      //   console.log('download')
      //
      //
      // }

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
