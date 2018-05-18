//需要在这里传输查询时间，构造成下面这种格式
//{b_year, e_year, b_month, e_month, b_day, e_day}

var paint = function() {
    //在这里获取查询时间
    var time = {
        'b_year': $('#year-begin option:selected').val(),
        'e_year': $('#year-end option:selected').val(),
        'b_month': $('#month-begin option:selected').val(),
        'e_month': $('#month-end option:selected').val(),
        'b_day': $('#day-begin option:selected').val(),
        'e_day': $('#day-end option:selected').val()
    };
    var res = $.post('/data', time).done(function(data) {
        if (data) {
            draw(data);
        }
        else {
            console.log('fuck');
        }
    });
}

var draw = function(data) {
    //传过来的data是一个数组，每个元素都是一个对象，对象格式{id, time, temperature, humidity}
    //销毁之前的echarts对象
    echarts.dispose(document.getElementById('div-chart'));
    var myChart = echarts.init(document.getElementById('div-chart'));

    //拆分对象
    var id = [], time = [], temperature = [], humidity = [];
    for (var i = 0; i < data.length; i++) {
        id.push(i + 1);
        time.push(data[i].time);
        temperature.push(data[i].temperature);
        humidity.push(data[i].humidity);
    }

    //设置绘图选项
    option = {
        title : {
            text: '温湿度变化',
            subtext: '来自lee的树莓派'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['温度', '湿度']
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
                type: 'category',
                boundaryGap: false,
                //这里放上x轴上显示的刻度
                data : time
            },
            {
                gridIndex: 1,
                type : 'category',
                boundaryGap : false,
                data : time
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
                data: temperature,
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
                data: humidity,
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

}
