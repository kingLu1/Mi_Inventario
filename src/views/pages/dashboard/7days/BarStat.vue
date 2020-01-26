<template lang="html">
  <statistics-card-line
    icon="CoffeeIcon"
    :statistic="totalSold | k_formatter" statisticTitle="Drinks Sold"
    :chartData="subscribersGainedChartData.series"
    color="warning"
    type='area'/>
</template>

<script>
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
  import {getSales} from "../../../../stitch/api/sales";

  export default {
    name: 'BarStat',
    components: {
      StatisticsCardLine
    },
    data() {
      return {
        sales: [],
        totalSold: 0,
        subscribersGainedChartData: {
          series: [{
            name: 'Subscribers',
            data: [28, 40, 36, 52, 38, 60, 55]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {
                show: false,
              },
              sparkline: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              width: 2.5
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 80, 100]
              }
            },
            xaxis: {
              type: 'numeric',
              lines: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              labels: {show: false}
            },
            yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {left: 0, right: 0},
            }],
            tooltip: {
              x: {show: false}
            },
          },
        },
      }
    },
    methods: {
      getSales() {
        this.axios.get(getSales).then((res) => {
          this.sales = res.data;
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
    },
    created() {
      this.getSales()
    },
    watch: {
      sales() {

      }
    }
  }
</script>
