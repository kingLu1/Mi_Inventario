<template>
  <vx-card>
    <div slot="no-body">
      <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="Submit"
                   @on-complete="formSubmitted">
        <tab-content title="Select Vendors" class="mb-5" icon="feather icon-plus">
          <!-- tab 1 content -->
          <div class="vx-row flex justify-center">
            <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3  xl:w-1/3 mt-5">
              <div class="vx-row flex">
                <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <div class="mb-2">
                    <p>Select Vendor<span class="text-danger ml-1">*</span></p>
                  </div>
                  <v-select label="countryName" v-model="selectedVendor" :options="countries"></v-select>
                </div>
                <div class="vx-col actions w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <vs-button @click="addVendor" color="success" type="filled" icon-pack="feather" icon="icon-plus"
                             class="mr-2">
                    Add
                  </vs-button>
                </div>
              </div>

            </div>
            <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mt-5">
              <div class="mb-1">
                <p>Selected Vendor</p>
              </div>
              <vs-chips color="rgb(145, 32, 159)" placeholder="No Vendor" v-model="chips"
                        remove-icon="delete_forever">
                <vs-chip
                  :key="chip"
                  @click="remove(chip)"
                  v-for="chip in chips"
                  closable
                  close-icon="cancel">
                  {{ chip }}
                </vs-chip>
              </vs-chips>
            </div>
          </div>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Select Product" class="mb-5" icon="feather icon-briefcase">
          <div class="vx-row">
            <div class="vx-row flex justify-center">
              <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3  xl:w-1/3 mt-5">
                <div class="vx-row flex"></div>
              </div>
            </div>
          </div>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="Select Quantity" class="mb-5" icon="feather icon-image">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <vs-input label="Event Name" v-model="eventName" class="w-full mt-5"/>
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-select v-model="city" class="w-full select-large mt-5" label="Event Location">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions"
                                class="w-full"/>
              </vs-select>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select v-model="status" class="w-full select-large" label="Event Status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions"
                                class="w-full"/>
              </vs-select>
            </div>
            <div class="vx-col md:w-1/2 w-full md:mt-8">
              <div class="demo-alignment">
                <span>Requirements:</span>
                <div class="flex">
                  <vs-checkbox>Staffing</vs-checkbox>
                  <vs-checkbox>Catering</vs-checkbox>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <tab-content title="Check" class="mb-5" icon="feather icon-image">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <vs-input label="Event Name" v-model="eventName" class="w-full mt-5"/>
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-select v-model="city" class="w-full select-large mt-5" label="Event Location">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions"
                                class="w-full"/>
              </vs-select>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select v-model="status" class="w-full select-large" label="Event Status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions"
                                class="w-full"/>
              </vs-select>
            </div>
            <div class="vx-col md:w-1/2 w-full md:mt-8">
              <div class="demo-alignment">
                <span>Requirements:</span>
                <div class="flex">
                  <vs-checkbox>Staffing</vs-checkbox>
                  <vs-checkbox>Catering</vs-checkbox>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </vx-card>

</template>

<script>
    import vSelect from 'vue-select'

    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'

    export default {
        data() {
            return {
                selectedVendor: '',
                chips: [],
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
            formSubmitted() {
                alert("Form submitted!");
            },
            addVendor() {

                let vendor = this.selectedVendor;
                this.chips.push(vendor.countryName);
                this.selectedVendor = ''

            },
            remove(item) {
                this.chips.splice(this.chips.indexOf(item), 1)
            }
        },
        components: {
            FormWizard,
            TabContent,
            vSelect

        }
    }
</script>
<style lang="scss" scoped>
  .actions {
    align-self: flex-end;
  }

</style>
