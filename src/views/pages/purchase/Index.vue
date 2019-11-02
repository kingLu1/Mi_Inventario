<template>
  <vx-card>

    <div>
      <vs-tabs>
        <vs-tab label="Bar">
          <div class="w-full">
            <bar class="w-full col-mx-auto"></bar>
          </div>
        </vs-tab>
        <vs-tab label="Barbeque">
          <div></div>
        </vs-tab>
        <vs-tab label="Kitchen">
          <div></div>
        </vs-tab>
        <vs-tab label="Pool">
          <div></div>
        </vs-tab>
      </vs-tabs>
    </div>
  </vx-card>

</template>

<script>
    import bar from './bar/Index'

    export default {
        name: "Index",
        data: () => ({
            colorX: 'primary'
        }),
        components: {
            bar
        }
    }
</script>

<style scoped>

</style>
