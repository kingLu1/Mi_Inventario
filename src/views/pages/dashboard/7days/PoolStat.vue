<template lang="html">
  <statistics-card-line
    icon="LifeBuoyIcon"
    statistic="92.6k"    statisticTitle="Tickets Sold"
    :chartData="subscribersGainedChartData.series"
    type='area' />
</template>

<script>
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

    export default {
        name: 'PoolStat',
        components: {
            StatisticsCardLine
        },
        data() {

            return {
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
                            labels: { show: false }
                        },
                        yaxis: [{
                            y: 0,
                            offsetX: 0,
                            offsetY: 0,
                            padding: { left: 0, right: 0 },
                        }],
                        tooltip: {
                            x: { show: false }
                        },
                    },
                },
            }
        }
    }
</script>
