<template>
  <div class="p-base pt-2 w-full">
    <div class="vx-row flex flex-row">
      <div class="vx-col">
        <vx-card @click="$router.push('/')"
                 class="p-3 cursor-pointer hover:bg-primary hover:text-white">
          <template slot="no-body">
            <div class="flex items-center">
              <feather-icon class="" icon="HomeIcon" svgClasses="h-6 w-6"/>
              <span class="pl-2">
              Home
            </span>
            </div>

          </template>
        </vx-card>
      </div>
      <div class="vx-col" v-if="$acl.check('superAdmin')">
        <vx-card @click="$router.push('/dashboard')" class="p-3 cursor-pointer hover:bg-primary hover:text-white">
          <template slot="no-body">
            <div class="flex items-center">
              <feather-icon class="" icon="ImageIcon" svgClasses="h-6 w-6"/>
              <span class="pl-2">
              Dashboard
            </span>
            </div>


          </template>
        </vx-card>
      </div>
      <div class="vx-col" v-if="$acl.check('admin')">
        <vx-card @click="$router.push('/report')" class="p-3 cursor-pointer hover:bg-primary hover:text-white">
          <template slot="no-body">
            <div class="flex items-center">
              <feather-icon class="" icon="ArchiveIcon" svgClasses="h-6 w-6"/>
              <span class="pl-2">
               Reports
            </span>
            </div>

          </template>
        </vx-card>
      </div>
      <div class="vx-col">
        <vx-card @click="logout"
                 class="p-3 bg-danger  cursor-pointer text-white">
          <template slot="no-body">
            <div class="flex items-center">
              <feather-icon class="" icon="LogOutIcon" svgClasses="h-6 w-6"/>
              <span class="pl-2">
             Logout
            </span>
            </div>

          </template>
        </vx-card>
      </div>
    </div>
    <div class="vx-row pt-4 flex justify-center flex-col w-full">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 xl:w-1/3">
        <vx-card class="p-3">
          <template slot="no-body">
            <div class="flex justify-center my-3">
              <vs-avatar :text="user_displayName" class="fontt" color="primary" size="200px"/>
            </div>
            <div class="px-5 text-lg">
              <p class="mb-2">
                <span class=""> Name</span> : <span class="ml-2"> {{AppActiveUser.first_name}} {{AppActiveUser.last_name}}</span>
              </p>
              <p class="mb-2">
                <span class=""> Email</span> : <span class="ml-2"> {{AppActiveUser.email}}</span>
              </p>
              <p class="mb-2">
                <span class=""> Status</span> : <span class="ml-2 text-success"
                                                      v-if="AppActiveUser.active"> Active</span><span
                class="ml-2 text-success"
                v-else> Suspended</span>
              </p>
              <p class="mb-2">
                <span class=""> Position</span> : <span class="ml-2"> {{AppActiveUser.post}}</span>
              </p>
              <p class="mb-2">
                <span class=""> Role</span> : <span class="ml-2"> {{AppActiveUser.role}}</span>
              </p>
            </div>
            <div class="flex justify-between px-5 mt-5 mb-3">
              <vs-button color="warning">Edit Profile</vs-button>
              <vs-button color="dark">Change Password</vs-button>
            </div>
          </template>
        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Profile",
    // data: () => ({}),
    computed: {
      ...mapState(['AppActiveUser']),
      user_displayName() {
        return this.AppActiveUser.first_name + ' ' + this.AppActiveUser.last_name
      },
    },
    methods: {
      logout() {
        const payload = {
          notify: this.$vs.notify,
        };
        this.$store.dispatch('logoutCurrentUser', payload)
      },
    }
  }
</script>

<style scoped>
  .fontt {
    font-size: 150px;
  }
</style>
