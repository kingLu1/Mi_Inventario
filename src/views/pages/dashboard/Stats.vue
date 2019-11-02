<template>
  <div class="vx-row">
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
      <vx-card class="overflow-hidden">
        <div>
          <div>
            <div class="font-semibold mb-2"><p>Cash</p></div>
            <div>
              <h3 class="mb-1 font-semibold text-center text-success">{{cash | currency}}</h3>
            </div>

          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
      <vx-card class="overflow-hidden">
        <div>
          <div>
            <div class="font-semibold mb-2"><p>Credit</p></div>
            <div>
              <h3 class="mb-1 font-semibold text-center text-success">{{cash | currency}}</h3>
            </div>

          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
      <vx-card class="overflow-hidden">
        <div>
          <div>
            <div class="font-semibold mb-2"><p>Debts</p></div>
            <div>
              <h3 class="mb-1 font-semibold text-center text-danger">{{cash | currency}}</h3>
            </div>

          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
      <vx-card class="overflow-hidden">
        <div>
          <div>
            <div class="font-semibold mb-2"><p>Lost</p></div>
            <div>
              <h3 class="mb-1 font-semibold text-center text-danger">{{cash | currency}}</h3>
            </div>

          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Stats",
        data(){
            return{
                cash: 1000000
            }
        }
    }
</script>

<style scoped>

</style>
