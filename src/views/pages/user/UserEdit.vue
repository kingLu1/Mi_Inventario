<template>
  <vs-sidebar click-not-close position-right parent="body"
              color="primary" style=""
              class="items-no-padding add-new-data-sidebar" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Edit User</h4>
      <feather-icon icon="XIcon"
                    @click.stop="isSidebarActiveLocal = false"
                    class="cursor-pointer"
      />
    </div>
    <vs-divider class="mb-0"/>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <!--        <vs-input label="First Name"-->
        <!--                  name="first name"-->
        <!--                  v-validate="'required'"-->
        <!--                  data-vv-validate-on="blur"-->
        <!--                  v-model="selected.first_name"-->
        <!--                  class="mt-5 w-full"/>-->
        <!--        <span class="text-danger text-sm"-->
        <!--              v-show="errors.has('first name')">{{ errors.first('first name') }}</span>-->

        <!--        <vs-input-->
        <!--          label="Last Name"-->
        <!--          v-validate="'required'"-->
        <!--          data-vv-validate-on="blur"-->
        <!--          name="last name"-->
        <!--          v-model="selected.last_name"-->
        <!--          class="mt-5 w-full"/>-->
        <!--        <span class="text-danger text-sm"-->
        <!--              v-show="errors.has('last name')">{{ errors.first('last name') }}</span>-->

        <!--        <vs-input v-model="selected.email"-->
        <!--                  v-validate="'required|email'"-->
        <!--                  data-vv-validate-on="blur"-->
        <!--                  label="Email"-->
        <!--                  name="email"-->
        <!--                  class="mt-5 w-full"/>-->
        <!--        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>-->

        <vs-select v-model="selected.role"
                   name="role"
                   label="User Role"
                   class="mt-5 w-full"
                   v-validate="'required'">
          <vs-select-item :key="index" :value="role.title" :text="role.title" v-for="(role, index) in roles"/>
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('role')">{{ errors.first('role') }}</span>

        <vs-select v-model="selected.post"
                   name="post"
                   label="Position"
                   class="mt-5 w-full"
                   v-validate="'required'">
          <vs-select-item :key="index" :value="post.title" :text="post.title" v-for="(post,index ) in posts"/>
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('post')">{{ errors.first('post') }}</span>


        <!--        <vs-input v-model="model.password"-->
        <!--                  type="password"-->
        <!--                  v-validate="'required'"-->
        <!--                  data-vv-validate-on="blur"-->
        <!--                  icon-after="true"-->
        <!--                  icon="visibility"-->
        <!--                  label="Password"-->
        <!--                  name="password"-->
        <!--                  class="mt-5 w-full"/>-->
        <!--        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>-->

        <!--        <vs-input v-model="model.confirm_password"-->
        <!--                  type="password"-->
        <!--                  label="Confirm Password"-->
        <!--                  v-validate="'required' |'confirmed:password'"-->
        <!--                  data-vv-validate-on="blur"-->
        <!--                  icon-after="true"-->
        <!--                  icon="check"-->
        <!--                  name="confirm password"-->
        <!--                  class="mt-5 w-full"/>-->
        <!--        <span class="text-danger text-sm"-->
        <!--              v-show="errors.has('confirm password')">{{ errors.first('confirm password') }}</span>-->


      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6 vs-con-loading__container" @click="EditUser" ref="loadableButton"
                 id="button-with-loading">Edit
      </vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>

  </vs-sidebar>


</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import vSelect from 'vue-select';
  import {getPosts, getRoles} from '../../../stitch/api/structure'
  import {getClient} from "../../../stitch/app";


  export default {
    name: "AddUser",
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
      VuePerfectScrollbar, vSelect
    },
    data: () => ({
      // VuePerfectScrollbar
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      posts: [],
      roles: [],
      // button loading
      backgroundLoading: '#7367F0',
      colorLoading: 'white',
    }),
    methods: {
      EditUser() {
        this.$validator.validateAll().then(result => {
          this.$vs.loading({
            background: this.backgroundLoading,
            color: this.colorLoading,
            container: '#button-with-loading',
            scale: 0.45
          })
          let data = [this.selected];
          if (result) {
            getClient().callFunction('UserEdit', data).then(
              res => {
                // console.log(res)
                // this.$emit('newUser');
                this.notify({
                  text: 'Successful',
                  title: 'User Edit',
                  color: 'success'
                });
                this.isSidebarActiveLocal = false;

                this.$vs.loading.close('#button-with-loading > .con-vs-loading');

              }
            ).catch(
              err => {
                // console.log(err)
                this.$vs.loading.close('#button-with-loading > .con-vs-loading');
                this.notify({text: err.message, title: 'Error', color: 'danger'})
              }
            )
          } else {
            // steps have errors
          }
        })
      },
      // user() {
      //   this.selected.created_by = this.$store.state.AppActiveUser.first_name + ' ' + this.$store.state.AppActiveUser.last_name
      // },
      getRoles() {
        this.axios.get(getRoles).then((res) => {
          this.roles = res.data;
        }).catch((err) => {
          this.notify({text: err.message, title: 'Error', color: 'danger'});
        });
      },
      getPosts() {
        this.axios.get(getPosts).then((res) => {
          this.posts = res.data;
        }).catch((err) => {
          this.notify({text: err.message, title: 'Error', color: 'danger'});
        });
      },
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
      // this.user();
      this.getPosts();
      this.getRoles();
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

