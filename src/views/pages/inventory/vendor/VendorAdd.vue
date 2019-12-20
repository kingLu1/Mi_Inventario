<template>
  <vs-sidebar click-not-close position-right parent="body"
              color="primary"
              style=""
              class="items-no-padding add-new-data-sidebar"
              spacer
              v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Add Vendor</h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <vs-input label="Name"
                  name="Vendor Name" v-validate="'required'"
                  placeholder="Vendor Name"
                  data-vv-validate-on="blur"
                  v-model="model.vendor.name"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Vendor Name')">{{ errors.first('Vendor Name') }}</span>
        <vs-input label="Contact Name"
                  name="Contact Name" v-validate="'required'"
                  placeholder="Contact Name"
                  data-vv-validate-on="blur"
                  v-model="model.vendor.contact"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Contact Name')">{{ errors.first('Contact Name') }}</span>
        <vs-input label="Phone"
                  name="Contact Phone" v-validate="'required|numeric|min:11|max:11'"
                  placeholder="Contact Phone"
                  data-vv-validate-on="blur"
                  v-model="model.vendor.phone"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('Contact Phone')">{{ errors.first('Contact Phone') }}</span>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button @click="addVendor()" ref="loadableButton" id="button-with-loading"
                 class="mr-6 vs-con-loading__container"
      >Add
      </vs-button>
      <vs-button type="border" color="danger" @click.stop="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>


</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {getClient} from '../../../../stitch/app'
    import {mapState} from 'vuex'

    export default {
        name: "AddVendor",
        props: {
            isSidebarActive: {
                type: Boolean,
                required: true
            }
        },
        components: {
            VuePerfectScrollbar
        },
        data: () => ({
            //Button Loading
            backgroundLoading: '#7367F0',
            colorLoading: 'white',
            //
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            model: {
                vendor: {
                    created_on: Date(),
                    created_by: ''
                }
            },
        }),
        methods: {
            addVendor() {
                this.$validator.validateAll().then(result => {
                        this.$vs.loading({
                            background: this.backgroundLoading,
                            color: this.colorLoading,
                            container: '#button-with-loading',
                            scale: 0.45
                        })
                        let data = [this.model.vendor];
                        if (result) {
                            getClient().callFunction('VendorCreate', data).then(
                                res => {
                                    this.$emit('newVendor');
                                    this.notify({
                                        text: 'Successfully Added New Vendor!',
                                        title: '',
                                        color: 'success'
                                    });
                                    this.model.vendor = {};
                                    this.isSidebarActiveLocal = false;
                                    this.$vs.loading.close('#button-with-loading > .con-vs-loading');

                                }
                            ).catch(
                                err => {
                                    this.$vs.loading.close('#button-with-loading > .con-vs-loading');

                                    this.notify({text: err.message, title: 'Error', color: 'danger'})
                                }
                            )
                        } else {
                            // steps have errors
                        }
                    }
                )
            }
        },
        computed: {
            isSidebarActiveLocal: {
                get() {
                    return this.isSidebarActive
                }
                ,
                set(val) {
                    if (!val) {
                        this.$emit('closeSidebar');
                    }
                },


            },
            ...mapState(['AppActiveUser'])

        },
        mounted() {
            this.model.vendor.created_by = this.AppActiveUser.first_name + " " + this.AppActiveUser.last_name

        }
    }

</script>

<style lang="scss">

  .add-new-data-sidebar {
    position: absolute;
    z-index: 60000;

    /deep/ .vs-sidebar--background {
      z-index: 52010;
    }

    .vs-sidebar {
      z-index: 52010;
      width: 900px !important;
      max-width: 90vw !important;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
  }

</style>

