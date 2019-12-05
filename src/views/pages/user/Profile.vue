<template>
  <div class="p-base">
    <vx-card>
      {{AppActiveUser}}
    </vx-card>
  </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Profile",
        // data: () => ({}),
        computed: {
            ...mapState(['AppActiveUser'])
        }
    }
</script>

<style scoped>

</style>
