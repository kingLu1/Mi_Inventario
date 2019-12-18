<template>
  <div class="vx-row px-2">
    <div v-for="o in outlets" v-if="!showOutlet" @click="chooseOutlet(o.name)"
         class="vx-col col mb-base cursor-pointer row px-1 w-full h-20 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div :class="o.color" :style="{background: `rgba(var(--vs-${o.color}),.85)`}" class="w-full h-full inner_col">
        <p class="p-4 text-lg font-semibold" style="position: absolute;">{{o.name | capitalize}}</p>
        <div class="p-4 pb-0 " :class="{'flex justify-center items-center': iconRight}">
          <feather-icon :icon="o.icon" class="p-3 bg-white inline-flex rounded-full"
                        :class="[`text-${o.color}`, {'mb-4': !iconRight}]"/>
          <div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <component :is="activeComponent" v-if="showOutlet"/>
    </transition>

  </div>

</template>

<script>
  import bar from './bar/Index';
  import kitchen from './kitchen/Index';
  import barbeque from './barbeque/Index';
  import pool from './pool/Index';
  import eventBus from "../../../eventBus";

  export default {
    name: "Index",
    data: () => ({
      iconRight: {
        type: Boolean,
        default: false
      },
      outlets: [{
        name: "bar",
        color: "warning",
        icon: "CoffeeIcon"
      }, {
        name: "barbeque",
        color: "success",
        icon: "AnchorIcon"

      }, {
        name: "kitchen",
        color: "danger",
        icon: "DatabaseIcon"

      }, {
        name: "pool",
        color: "primary",
        icon: "LifeBuoyIcon"

      }],
      showOutlet: false,
      activeComponent: null
    }),
    components: {
      bar, kitchen, barbeque, pool
    },
    methods: {
      chooseOutlet(o) {
        this.activeComponent = o
        this.showOutlet = true
      },
      listener() {
        eventBus.$on(
          'back', () => this.showOutlet = false
        )
      }
    },
    created() {
      this.listener()
    }
  }
</script>

<style scoped>
  .row {

  }

  .col {
    height: 150px;
  }

  .inner_col {

    display: flex;
    /*align-items: center;*/
    /*justify-content: center;*/
    color: rgb(255, 255, 255);
    border-radius: 10px;

  }

  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .3s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-15px);
    opacity: 0;
  }
</style>
