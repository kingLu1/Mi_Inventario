<template>

  <vs-sidebar click-not-close position-right parent="body"
              color="primary" style=""
              class="items-no-padding add-new-data-sidebar" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Add New User</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false"
                    class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <vs-input label="First Name"
                  name="first name" v-validate="'required'"
                  data-vv-validate-on="blur"
                  v-model="model.user.first_name"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('first name')">{{ errors.first('first name') }}</span>

        <vs-input label="Last Name" v-validate="'required'" data-vv-validate-on="blur"
                  name="last name" v-model="model.user.last_name" class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('last name')">{{ errors.first('last name') }}</span>

        <vs-input v-model="model.user.email" v-validate="'required|email'"
                  data-vv-validate-on="blur" label="Email" name="email" class="mt-5 w-full"/>
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <!--                <vs-select v-model="model.role" name="role" label="Position" class="mt-5 w-full" v-validate="'required'"-->
        <!--                           data-vv-validate-on="blur">-->
        <!--                    <vs-select-item :key="role.value" :value="role.value" :text="role.value" v-for="role in roles"/>-->
        <!--                </vs-select>-->
        <span class="text-danger text-sm" v-show="errors.has('role')">{{ errors.first('role') }}</span>

        <vs-input v-model="model.user.password"
                  type="password"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  icon-after="true"
                  icon="visibility"
                  label="Password"
                  name="password"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        <vs-input v-model="model.confirm_password"
                  type="password"
                  label="Confirm Password"
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  name="confirm password"
                  class="mt-5 w-full"/>
        <span class="text-danger text-sm"
              v-show="errors.has('confirm password')">{{ errors.first('confirm password') }}</span>


      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="addUser()">Add User</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>

  </vs-sidebar>


</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    // import 'firebase/auth'
    // import firebase from 'firebase/app'

    export default {
        name: "AddUser",
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
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            model: {
                user: {
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
            addUser() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        const payload = {
                            model: this.model,
                            notify: this.$vs.notify,
                            loading: this.$vs.loading
                        };
                        this.$store.dispatch('createUser', payload);

                    } else {
                        // form have errors
                    }
                })
            },
            user() {
                this.model.user.created_by = this.$store.state.AppActiveUser.name
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
            this.user();
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

