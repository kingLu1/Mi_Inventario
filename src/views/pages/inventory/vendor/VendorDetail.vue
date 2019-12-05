<template>
  <div id="table-loader" class="vs-con-loading__container">
    <vx-card>
      <vs-row>
        <vs-col>
          <div class="flex justify-end">
            <vx-tooltip text="Go Back" position="top">
              <vs-button icon-pack="feather" icon="icon-corner-up-left"
                         color="primary"
                         class="mr-2" @click="backToTable">
                Back
              </vs-button>
            </vx-tooltip>
          </div>
        </vs-col>
      </vs-row>
      <div class="vx-row">
        <div class="vx-col w-full sm: md: lg:offset-2 xl:">
          <div>
            <p class="mb-4">Name : {{activeVendor.name}} </p><span></span>
            <p class="mb-4">Contact Name : {{activeVendor.contact}} </p><span></span>
            <p class="mb-4">Contact Number : {{activeVendor.phone}} </p><span></span>
            <p class="mb-4">Total Number Of Products : <span class="text-danger">20</span> </p><span></span>
            <p class="mb-4"> Created By : {{activeVendor.created_by}} </p><span></span>
            <p class="mb-4"> Created On : {{activeVendor.created_on}} </p><span></span>
            <p class="mb-4"> Last Updated By: {{activeVendor.last_update}}</p><span></span>
            <p class="mb-4"> Last Updated On: {{activeVendor.last_update_on}}</p><span></span>
          </div>
          <div class="flex">
            <vs-button
              color="success"
              class="mr-2 w-full" @click="backToTable">
              Show All Products
            </vs-button>
            <vs-button
              color="dark"
              class="mr-2 w-full" @click="backToTable">
              Show Last Purchasing
            </vs-button>
          </div>

        </div>
      </div>
    </vx-card>
  </div>

</template>

<script>
    export default {
        name: "DetailVendor",
        data: () => ({}),
        props: {
            activeVendor: {
                required: true
            }
        },
        methods: {
            backToTable() {
                this.$emit("backToTable")
            }

        }
    }
</script>

<style scoped>

</style>
