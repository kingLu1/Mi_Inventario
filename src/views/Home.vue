<template class="vs-con-loading__container" id="div-with-loading">
  <div>
    <div class="vx-row mb-base">
      <div class="vx-col w-full ">
        <h1 class="font-bold mb-3">{{greet}}, {{AppActiveUser.post}} {{AppActiveUser.first_name}}</h1>
        <h6 class="font-semibold"> {{salute}}</h6>
      </div>
    </div>
    <div class="vx-row" v-if="this.$acl.check('superAdmin')">
      <div class="vx-col w-full mb-3">
        <p @click="$router.push('dashboard')">
          <vs-chip class="font-semibold cursor-pointer">Information</vs-chip>
        </p>

      </div>

      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <bar/>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <barbeque/>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <kitchen/>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <pool/>
      </div>
      <div class="vx-col w-full mb-3 flex justify-center">
        <p @click="$router.push('dashboard')">

          <vs-chip class="font-semibold cursor-pointer text-primary"> View all
            Information
          </vs-chip>
        </p>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-3">
        <vs-chip class="font-bold">Actions</vs-chip>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base" v-if="this.$acl.check('admin')">
        <vx-card title="Daily Sales" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="primary" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-trending-up">
            </vs-button>
          </template>
          <p>
            Record Sales for
            <span class="font-black cursor-pointer " @click="$router.push({path:'sales'})">Bar</span>
            <!--            <span class="font-black" @click="$router.push('purchase/kitchen')">kitchen</span>-->
          </p>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base" v-if="this.$acl.check('admin')">
        <vx-card title="Purchasing" noShadow cardBorder>
          <template slot="actions">
            <vs-button radius color="danger" class="mr-2" type="filled"
                       icon-pack="feather" icon="icon-truck">
            </vs-button>
          </template>
          <p>
            Keep Records of stock added to
            <span class="font-black cursor-pointer" @click="$router.push('purchase')">Bar</span>
            <!--            <span class="font-bold underline">kitchen</span>-->
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
            Add New
            <span class="font-bold cursor-pointer" @click="$router.push('inventory/product')"> Product</span>,
            <span class="font-bold cursor-pointer"
                  @click="$router.push({path:'/inventory/category'})">Category</span>,
            <span class="font-bold cursor-pointer" @click="$router.push('inventory/vendor')">Vendor</span>
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
            <span class="font-bold cursor-pointer" @click="$router.push('/users')">Add New Users</span>
<!--            <span class="font-bold cursor-pointer" @click="$router.push('/users')">View All Users</span>-->
          </p>
        </vx-card>
      </div>
    </div>

  </div>

</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import eventBus from "../eventBus";

  import kitchen from './pages/dashboard/7days/KitchenStat';
  import bar from './pages/dashboard/7days/BarStat';
  import pool from './pages/dashboard/7days/PoolStat';
  import barbeque from './pages/dashboard/7days/BarbequeStat';

  export default {
    components: {
      kitchen, bar, pool, barbeque
    },
    data: () => ({
      timeOfDay: new Date().getHours(),
      greet: '',
      salute: '',

    }),
    computed: {
      ...mapGetters([
        // 'user'
      ]),
      ...mapState(['AppActiveUser']),
    },

    watch: {}
    ,
    methods: {
      greeting() {
        if (this.timeOfDay <= 12) {
          this.salute = "How was your night? I hope you slept well.";
          this.greet = "Good Morning";
        } else if (this.timeOfDay <= 18) {
          this.salute = "How is your day going? I hope you crushing it !!!";
          this.greet = "Good Afternoon";
        } else if (this.timeOfDay >= 18) {
          this.salute = "How was your day? I hope it was as amazing as you !!!";
          this.greet = "Good Evening";
        }
      },
      listener() {
        eventBus.$once('changeAccess', (payload) => {
          this.$acl.change(payload)
        })
      }
    },
    beforeCreate() {
    },
    created() {
      this.greeting()
      this.listener()
      // console.log(this.$route)
    },
    mounted() {

    }
  }
</script>
<style>

</style>
