<!--pie chart day,week,year,month-->
<template>
  <vx-card title="Expenses">
    <!-- SLOT = ACTIONS -->
    <template slot="actions">
      <change-time-duration-dropdown/>
    </template>

    <div>
      <ul class="mt-6">
        <li  class="flex mb-3">
          <feather-icon icon="CoffeeIcon" svgClasses="h-5 w-5 stroke-current text-warning"></feather-icon>
          <span class="ml-2 inline-block font-semibold">Bar</span>
          <span class="mx-2">-</span>
          <span class="mr-4">$40%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">50%</span>
            <!--            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>-->
          </div>
        </li>
        <li  class="flex mb-3">
          <feather-icon icon="AnchorIcon" svgClasses="h-5 w-5 stroke-current text-success"></feather-icon>
          <span class="ml-2 inline-block font-semibold">Barbeque</span>
          <span class="mx-2">-</span>
          <span class="mr-4">$40%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">50%</span>
<!--            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>-->
          </div>
        </li>
        <li  class="flex mb-3">
          <feather-icon icon="DatabaseIcon" svgClasses="h-5 w-5 stroke-current text-danger"></feather-icon>
          <span class="ml-2 inline-block font-semibold">Kitchen</span>
          <span class="mx-2">-</span>
          <span class="mr-4">$40%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">50%</span>
<!--            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>-->
          </div>
        </li><li  class="flex mb-3">
          <feather-icon icon="LifeBuoyIcon" svgClasses="h-5 w-5 stroke-current text-primary"></feather-icon>
          <span class="ml-2 inline-block font-semibold">Pool</span>
          <span class="mx-2">-</span>
          <span class="mr-4">$40%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">50%</span>
<!--            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>-->
          </div>
        </li>
      </ul>
      <p class="text-lg font-bold pb-2 ">Total<span class="mx-2">-</span> <span class="mr-4">$40%</span>
      </p>

    </div>

  </vx-card>
</template>

<script>
    import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'

    export default {
        name: "Expense",
        components: {
            ChangeTimeDurationDropdown
        }
    }
</script>

<style scoped>

</style>
