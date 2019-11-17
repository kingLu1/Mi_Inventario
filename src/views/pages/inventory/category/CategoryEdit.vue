<template>
  <vs-sidebar click-not-close position-right parent="body"
              color="primary"
              class="items-no-padding add-new-data-sidebar"
              spacer
              v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Edit Category</h4>
      <feather-icon icon="XIcon"
                    @click.stop="isSidebarActiveLocal = false"
                    class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="p-6">
        <vs-input label="Name"
                  name="Category Name" v-validate="'required'"
                  data-vv-validate-on="blur"
                  v-model="selected.name"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('first name')">{{ errors.first('first name') }}</span>
      </div>
    </VuePerfectScrollbar>
    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="editCategory()">Save</vs-button>
      <vs-button type="border" color="danger" @click.stop="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>


<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';

    export default {
        name: "CategoryEdit",
        props: {
            isSidebarActive: {
                type: Boolean,
                required: true
            },
            selected: {
                required: true
            }
        },
        components: {
            VuePerfectScrollbar
        },
        data: () => ({
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            model: {
                category: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    position: '',
                    created_by: '',
                    created_at: ''
                },
                confirm_password: '',
            },
        }),
        methods: {
            editCategory() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        const payload = {
                            model: this.model,
                            notify: this.$vs.notify,
                            loading: this.$vs.loading
                        };
                    } else {
                        // form have errors
                    }
                })
            }
        },
        computed: {
            isSidebarActiveLocal: {
                get() {
                    return this.isSidebarActive
                },
                set(val) {
                    if (!val) {
                        this.$emit('closeSidebar');
                    }
                }
            },
        },
        mounted() {
            this.isMounted = true;
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
      width: 400px !important;
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

