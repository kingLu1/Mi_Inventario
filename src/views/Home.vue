<template>
<!--  TODO: Add Content and finalize design-->
  <div>
    <div class="vx-row mb-base">
      <div class="vx-col w-full ">
        <h1 class="font-bold mb-3">{{greet}}, {{user.post}} {{user.first_name}}</h1>
        <h6 class=""> {{salute}}</h6>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-3">
        <vs-chip class="font-bold">Actions</vs-chip>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <!--                 title-color="#fff"-->
        <!--                 content-color="#fff"-->
        <vx-card title="Record Daily Sales" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="primary" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-trending-up">
            </vs-button>
          </template>
          <p>
            Add Sales for <span class="font-bold underline" @click="">Bar</span>, <span class="font-bold underline">kitchen</span>
          </p>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <vx-card title="Purchases" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="danger" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-truck">
            </vs-button>
          </template>
          <p>
            Add Sales for <span class="font-bold underline" @click="">Bar</span>, <span class="font-bold underline">kitchen</span>
          </p>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <vx-card title="Inventory" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="warning" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-folder">
            </vs-button>
          </template>
          <p>
            Add Sales for <span class="font-bold underline" @click="">Bar</span>, <span class="font-bold underline">kitchen</span>
          </p>
        </vx-card>
      </div
      >
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base" v-if="this.$acl.check('superAdmin')">
        <vx-card title="Users" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="success" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-users">
            </vs-button>
          </template>
          <p>
            Add Sales for <span class="font-bold underline" @click="">Bar</span>, <span class="font-bold underline">kitchen</span>
          </p>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base" v-if="this.$acl.check('superAdmin')">
        <vx-card title="Reports" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="primary" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-archive">
            </vs-button>
          </template>
          <p>
            Add Sales for <span class="font-bold underline" @click="">Bar</span>, <span class="font-bold underline">kitchen</span>
          </p>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-3">
        <vs-chip class="font-semibold">Information</vs-chip>
      </div>
    </div>
  </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    import stats from './pages/dashboard/Stats'

    export default {
        components: {
            stats
        },
        data: () => ({
            timeOfDay: new Date().getHours(),
            greet: '',
            salute: ''
        }),
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            greeting() {
                if (this.timeOfDay <= 12) {
                    this.salute = "how was your night? I hope you slept well.";
                    this.greet = "Good Morning";
                } else if (this.timeOfDay <= 18) {
                    this.salute = "how is your day going? I hope you crushing it!!!";
                    this.greet = "Good Afternoon";
                } else if (this.timeOfDay >= 18) {
                    this.salute = "how was day? I hope it was as amazing as you!!!";
                    this.greet = "Good Evening";
                }
            }
        },
        created() {
            this.greeting()
        }
    }
</script>
<style>

</style>
