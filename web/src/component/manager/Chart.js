import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin, Card, Tabs} from 'rc-ui'
import {connect} from 'react-redux'
// import echarts from 'echarts'
var echarts = require('echarts/lib/echarts');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
require('echarts/lib/component/toolbox');

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab
import {getFlowStat} from '../../action/map.action'

const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

/**
 * 公司列表
 * */
class Chart extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    closeCard = () => {
        const {changeChart} = this.props
        changeChart(false)
    }

    initChartsData = (props) => {
        const {data} = props
        const map = data.map
        // 绘制图表
        this.myChart.setOption({
            title: {
                text: '7日上行流量',
                // textAlign: 'center',
                // left: '50%',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: map.cbsj
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '上行流量',
                    type: 'line',
                    data: map.cbslsx,
                    itemStyle: {
                        normal: {
                            color: '#d48265'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        });


        // 绘制图表
        this.myChart1.setOption({
            title: {
                text: '7日下行流量',
                // textAlign: 'center',
                // left: '50%',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: map.cbsj
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '下行流量',
                    type: 'line',
                    data: map.cbslxx,
                    itemStyle: {
                        normal: {
                            color: '#009688'
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        });

        // 绘制图表
        this.myChart2.setOption({
            title: {
                text: '7日超载次数分析',
                // textAlign: 'center',
                // left: '50%',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: map.cbsj
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '超载次数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: map.cbczsl
                }
            ]
        });
    }

    componentDidMount() {
        this.myChart = echarts.init(document.getElementById('echart-top'));
        this.myChart1 = echarts.init(document.getElementById('echart-bottom'));
        this.myChart2 = echarts.init(document.getElementById('echart-over'));
        this.initChartsData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.data != this.props.data) {
        this.initChartsData(nextProps)
        // }
    }

    render() {
        const {show} = this.props
        const detailClass = classnames({
            'chart-win': true,
            active: show
        })
        return (
            <div className={detailClass}>
                <Card className={'demo-card'}>
                    <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                        <Path d={icons.close}/>
                    </Icon>}>
                        信息
                    </CardHeader>
                    <div className="chart-container">
                        <div style={{width: '100%', height: '250px'}} id='echart-top'></div>
                        <div style={{width: '100%', height: '250px'}} id='echart-bottom'></div>
                        <div style={{width: '100%', height: '250px'}} id='echart-over'></div>
                    </div>
                </Card>
            </div>
        )


    }
}

function mapStateToProps({flowStat:data}) {
    return {data}
}

export default connect(mapStateToProps)(Chart)

