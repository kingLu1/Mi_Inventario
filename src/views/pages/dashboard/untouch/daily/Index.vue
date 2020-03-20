<template>
  <vx-card title="Sales">
    <!--    <div slot="header">Here o</div>-->
    <template slot="actions">
      <p class=" text-sm font-semibold"> Yesterday</p>
    </template>
    <vs-row class="py-0 my-0">
      <vs-col class="text-right py-0 my-0">
        <p class=" font-thin ">Cash - {{cash | currency}}</p>
        <p class="font-thin ">Pos - {{pos | currency}}</p>
        <p class="font-semibold ">Total - {{pos + cash | currency}}</p>
      </vs-col>
    </vs-row>
    <e-charts autoresize :options="pie" ref="pie" auto-resize/>
  </vx-card>

</template>

<script>
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/chart/pie'

    export default {
        data() {
            return {
                pos: 12000,
                cash: 40000,
                pie: {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        // orient: 'vertical',
                        bottom: 'bottom',
                        data: ['Bar', 'Kitchen', 'Barbeque', 'Pool']
                    },
                    series: [
                        {
                            name: 'Stats',
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '50%'],
                            color: ['#FF9F43', '#28C76F', '#EA5455', '#7367F0'],
                            data: [
                                {value: 310, name: 'Bar'},
                                {value: 335, name: 'Barbeque'},
                                {value: 234, name: 'Kitchen'},
                                {value: 135, name: 'Pool'},
                            ],
                            itemStyle: {
                                normal: {
                                    // label : {
                                    //     show : false
                                    // },
                                    // labelLine : {
                                    //     show : false
                                    // }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
            }
        },
        components: {
            ECharts
        },
        mounted() {
            // let dataIndex = -1
            // let pie = this.$refs.pie
            // let dataLen = pie.options.series[0].data.length
            // setInterval(() => {
            //     pie.dispatchAction({
            //         type: 'downplay',
            //         seriesIndex: 0,
            //         dataIndex
            //     })
            //     dataIndex = (dataIndex + 1) % dataLen
            //     pie.dispatchAction({
            //         type: 'highlight',
            //         seriesIndex: 0,
            //         dataIndex
            //     })
            //     pie.dispatchAction({
            //         type: 'showTip',
            //         seriesIndex: 0,
            //         dataIndex
            //     })
            // }, 3000)
        }

    }

</script>
