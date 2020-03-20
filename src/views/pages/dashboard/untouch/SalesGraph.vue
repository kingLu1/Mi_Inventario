<template>
  <vx-card title="Sales">
    <vue-apex-charts type="area"
                     height="500"
                     :options="stats.chartOptions"
                     :series="stats.series">
    </vue-apex-charts>
  </vx-card>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import {getClient} from "../../../stitch/app";

  export default {
    components: {
      VueApexCharts
    },
    data() {
      return {
        sales: [],
        themeColors: ['#FF9F43', '#28C76F', '#EA5455',],
        stats: {
          series: [],
          chartOptions: {
            dataLabels: {
              enabled: false,
              position: 'top'
            },
            stroke: {
              curve: 'smooth'
            },
            // colors: this.themeColors,
            xaxis: {
              //   type: 'datetime',
              //   // categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
              //   //   "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
              //   //   "2018-09-19T06:30:00"
              //   // ],
            },
            // tooltip: {
            //   x: {
            //     format: 'dd/MM/yy'
            //   },
            //
            // }
          }
        }
      }
    },
    methods: {
      getSales() {
        getClient().callFunction('BarGraph').then(res => {
          this.sales = res;
        }).catch(err =>
          console.log(err))
      },
      getBarStats() {
        let data = this.sales.map(item =>
          item.total
        );
        let date = this.sales.map(item =>
          item.date
        );
        console.log(date)
        this.stats.series.push(
          {
            name: 'Bar',
            data: data
          })
        this.stats.xaxis = {
          type: 'datetime',
          categories: date
        }
      }
    }
    ,
    created() {
      this.getSales()
    },
    watch: {
      sales() {
        this.getBarStats()
      }
    }
  }

</script>

