<template>
  <div>
    <stats></stats>
    <div class="vx-row">
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
    </div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-base">
        <daily></daily>
      </div>
      <div class="vx-col w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
        <div class="vx-row">
          <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div class="vx-row">
              <div class="vx-col w-full sm:w-full mb-base">
                <purchase></purchase>
              </div>
              <div class="vx-col w-full sm:w-full  mb-base">
                <expense></expense>
              </div>
            </div>

          </div>
          <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
            <div class="vx-col w-full">
              <timeline/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <recent-purchase></recent-purchase>
      </div
      >
      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">

      </div>
      <!--      <div class="vx-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">-->

      <!--      </div>-->

    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <sales/>
      </div>
    </div>

  </div>


</template>

<script>
    import purchase from './Purchase';
    import recentPurchase from './RecentPurchasing';
    import expense from './Expense';
    import timeline from './Timeline';
    import sales from './SalesGraph';
    import daily from './daily/Index';
    import kitchen from './7days/KitchenStat';
    import bar from './7days/BarStat';
    import pool from './7days/PoolStat';
    import barbeque from './7days/BarbequeStat';
    import stats from './Stats'

    export default {
        components: {
            stats,purchase, recentPurchase, expense, timeline, sales, daily, kitchen, bar, barbeque, pool
        },
        data() {
            return {}
        }
    }

</script>
