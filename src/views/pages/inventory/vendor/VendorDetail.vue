<template>
  <div id="table-loader" class="vs-con-loading__container">
    <vs-card>
      <vs-row>
        <vs-col>
          <div class="flex justify-between">
            <vx-tooltip text="Go Back" position="top">
              <vs-button icon-pack="feather" icon="icon-corner-up-left"
                         color="primary"
                         class="mr-2" @click="">
              </vs-button>
            </vx-tooltip>
            <vx-tooltip text="More Actions" position="top">
              <vs-button icon-pack="feather" icon="icon-more-vertical"
                         color="primary"
                         class="" @click="">
                <vs-icon icon="polymer" size="20px" color="#BC1254"></vs-icon>
              </vs-button>
            </vx-tooltip>
          </div>
        </vs-col>

      </vs-row>
    </vs-card>
  </div>

</template>

<script>
    export default {
        name: "DetailVendor",
        data: () => ({}),
    }
</script>

<style scoped>

</style>
