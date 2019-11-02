<template>
    <vue-apex-charts type="area"
                     height="400"
                     :options="lineAreaChartSpline.chartOptions"
                     :series="lineAreaChartSpline.series">
    </vue-apex-charts>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        components: {
            VueApexCharts
        },
        data() {
            return {
                themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                lineAreaChartSpline: {
                    series: [{
                        name: 'Bar',
                        data: [31, 40, 28, 51, 42, 109, 100]
                    }, {
                        name: 'Barbeque',
                        data: [11, 32, 45, 32, 34, 52, 41]
                    }, {
                        name: 'Kitchen',
                        data: [17, 37, 45, 45, 34, 70, 300]
                    }, {
                        name: 'Pool',
                        data: [11, 32, 4, 32, 60, 52, 200]
                    }],
                    chartOptions: {
                        dataLabels: {
                            enabled: false,
                            position: 'top'
                        },
                        stroke: {
                            curve: 'smooth'
                        },
                        colors: this.themeColors,
                        xaxis: {
                            type: 'datetime',
                            categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
                                "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
                                "2018-09-19T06:30:00"
                            ],
                        },
                        tooltip: {
                            x: {
                                format: 'dd/MM/yy HH:mm'
                            },

                        }
                    }
                }
            }
        }
    }

</script>
