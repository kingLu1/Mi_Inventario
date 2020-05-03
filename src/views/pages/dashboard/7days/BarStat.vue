<template lang="html">
  <statistics-card-line
    :chartData="stats.series"
    :statistic="totalSold + getDebtsPaidProductTotal() | k_formatter" color="warning"
    icon="CoffeeIcon"
    statisticTitle="Products Sold"
    type='area'/>
</template>

<script>
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
  import {getClient} from "../../../../stitch/app";
  import {getBarPaidDebts} from "../../../../stitch/api/debts";

  export default {
    name: 'BarStat',
    components: {
      StatisticsCardLine
    },
    data() {
      return {
        totalSold: 0,
        sales: [],
        debtsPaid: [],
        stats: {
          series: [{
            name: 'Sold',
            data: [0, 0, 0, 0, 0, 0, 0]
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
      getDebts() {
        this.axios.get(getBarPaidDebts).then((res) => {
          // console.log(res.data);
          this.debtsPaid = res.data
        }).catch((err) => {
          this.notify({
            title: 'Error',
            text: err.message,
            color: 'danger'
          });
        });
      },
      getSalesStat() {
        getClient().callFunction('BarStats').then(res => {
          let data = res.map(item =>
            item.total
          );
          this.stats.series = [{
            name: 'Sold(₦)',
            data: data.reverse()
          }]
          // console.log(data.reverse())

        }).catch(err => {

          }
          // console.log(err)
        )
      },
      getSalesTodaySold() {
        getClient().callFunction('BarTotalSold').then(res => {
          this.sales = res;
        }).catch(err => {

          }
          // console.log(err)
        )
      },
      getTotalProductSold() {
        let products = this.sales.map(item => item.products);
        let i;
        let arr = []
        let sortedArr = []
        for (i = 0; i < products.length; i++) {
          for (let j = 0; j < products[i].length; j++) {
            if (products[i][j].sold.length) {
              arr.push(products[i][j].sold)
            }
          }
        }
        for (let m = 0; m < arr.length; m++) {
          for (let n = 0; n < arr[m].length; n++) {
            sortedArr.push(arr[m][n].sold)
          }
        }
        this.totalSold = sortedArr.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      },
      getDebtsPaidProductTotal() {
        let products = this.debtsPaid.map(item => item.products);
        let i;
        let arr = [];
        for (i = 0; i < products.length; i++) {
          for (let j = 0; j < products[i].length; j++) {
            arr.push(parseInt(products[i][j].holding.$numberInt))
          }
        }

        return arr.reduce((prev, curr) => {
          return prev + curr;
        }, 0)

      }
    },
    created() {
      this.getSalesStat()
      this.getSalesTodaySold()
      this.getDebts()
    }
    ,
    watch: {
      sales() {
        this.getTotalProductSold()
      },
      debtsPaid() {
        this.getDebtsPaidProductTotal()
      }
    }
  }
</script>
