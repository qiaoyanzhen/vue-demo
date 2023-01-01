<template>
    <div>
        <div  ref="main" style="width:100%;height:500px">
            434235235235
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data() {
        return {

        }
    },
    mounted(){
        this.echarts()
    },
    methods: {
        echarts() {

            //var ROOT_PATH = 'https://echarts.apache.org/examples';
                console.log(this.$refs.main)
            var myChart = this.$echarts.init(this.$refs.main);
            var option;

            myChart.showLoading();
            $.get('/api/data/asset/data/flare.json', function (data) {
                myChart.hideLoading();
                console.log(data)
                data.children.forEach(function (datum, index) {
                    index % 2 === 0 && (datum.collapsed = true);
                });
                myChart.setOption(
                    (option = {
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [
                            {
                                type: 'tree',
                                data: [data],
                                top: '1%',
                                left: '7%',
                                bottom: '1%',
                                right: '20%',
                                symbolSize: 7,
                                label: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 9
                                },
                                leaves: {
                                    label: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                },
                                emphasis: {
                                    focus: 'descendant'
                                },
                                expandAndCollapse: true,
                                animationDuration: 550,
                                animationDurationUpdate: 750
                            }
                        ]
                    })
                );
            });

            option && myChart.setOption(option);

        }
    }
}
</script>
<style scoped>

</style>