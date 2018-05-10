var myChart = echarts.init(document.getElementById('div-chart'));


option = {
    title : {
        text: '温湿度变化',
        subtext: '来自lee的树莓派'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['温度','湿度']
    },

    //定义两个图
    grid: [
        {x: '8%', y: '12%', height: '38%'},
        {x: '8%', y: '57%', height: '38%'}
    ],

    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            gridIndex: 0,
            show: true,
            type: 'category',
            boundaryGap: false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        },
        {
            gridIndex: 1,
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            gridIndex: 0,
            type : 'value',
            axisLabel : {
                formatter: '{value} °C'
            }
        },
        {
            gridIndex: 1,
            type : 'value',
            axisLabel : {
                formatter: '{value} %'
            }
        }
    ],
    series : [
        {
            name:'温度',
            type:'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'湿度',
            type:'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:[1, -2, 3, 2, 5, 3, 2, 0],
            markPoint : {
                data : [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
                    
                    
myChart.setOption(option);
