<template>
  <vx-card>
    <div class="vx-row flex ">
      <div class="vx-col mb-2 w-full sm:w-1/2 md:1/2 lg:w-1/5 xl:w-1/6">
        <div class="mb-2">
          <!--            label-->

          <p>Select Outlet<span class="text-danger ml-1">*</span></p>
        </div>
        <v-select label="countryName" v-model="selected" :options="countries" style="width:196px;"></v-select>
      </div>
      <div class="vx-col mb-2 flex w-full sm:1/2 md:w-2/4 lg:w-1/5 xl:w-1/6">
        <div>
          <div class="mb-2">
            <!--            label-->
            <p>From<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr :config="configFromdateTimePicker" v-model="fromDate" placeholder="Select Date"
                      @on-change="onFromChange"/>
        </div>
      </div>
      <div class="vx-col mb-2 flex w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/6">
        <div>
          <div class="mb-2">
            <!--            label-->

            <p>To<span class="text-danger ml-1">*</span></p>
          </div>
          <flat-pickr :config="configTodateTimePicker" v-model="toDate" placeholder="Select Date"
                      @on-change="onToChange"/>
        </div>
      </div>
      <div class="vx-col actions mt-2 pb-3 flex w-full h-full sm:w-full md:w-full lg:w-2/5 xl:w-2/6">
        <!--actions       -->
        <div class="flex flex-wrap">
          <vs-button @click="search()" color="primary" type="filled" icon-pack="feather" icon="icon-search"
                     class="mr-2">
            Search
          </vs-button>
          <vs-button @click="downloadReport()" color="danger" type="filled" icon-pack="feather" icon="icon-download">
            Download
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
                countries: [
                    {
                        countryCode: "INR",
                        countryName: "India",
                    },
                    {
                        countryCode: "AUS",
                        countryName: "Australia",
                    },
                    {
                        countryCode: "CA",
                        countryName: "Canada",
                    },
                ]
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
