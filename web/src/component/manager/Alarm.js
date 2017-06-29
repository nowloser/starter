/**
 * 预警统计组件
 * */

import React, {Component} from 'react'
import classnames from 'classnames'
import {Page, Table, Icon, Modal, Button} from 'rc-ui'
import {getAlarmTotal} from '../../action/map.action'
import {connect} from 'react-redux'
import * as cusIcons from '../cusIcons'
const Path = Icon.Path
class Alarm extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getAlarmTotal())
    }

    /**
     * 根据数据判断上升下降的状态
     * @param num
     * @return classname
     * */
    getStatusClass = (num) => {
        if (parseInt(num) >= 100) {
            return 'alarm-top'
        }

        if (parseInt(num) < 100) {
            return 'alarm-bottom'
        }
    }

    /**
     * 根据数据判断上升下降的值
     * @param num
     * @return classname
     * */

    getStatusNum = (num) => {
        if (parseInt(num) >= 100) {
            return num - 100
        }

        if (parseInt(num) < 100) {
            return -(100 - num)
        }
    }

    render() {
        const {data, stat} = this.props

        const statClass = classnames({
            'stat-container': true,
            active: stat
        })

        const rows = [
            {
                icon: 'alarm',
                title: '预警总数',
                num: data.yjzs,
                value: data.yjzszb
            },
            {
                icon: 'alarm12328',
                title: '12328接警数',
                num: data.jjzs,
                value: data.jjzszb,
                className: 'stat-12328-bg'
            },
            {
                icon: 'zysb',
                title: '作业申报预警',
                num: data.zysbyj,
                value: data.zysbyjzb,
                className: 'stat-week-bg'
            },
            {
                icon: 'zsgq',
                title: '证书过期预警',
                num: data.zsgqyj,
                value: data.zsgqyjzb,
                className: 'stat-zsgq-bg'
            },
            {
                icon: 'zycb',
                title: '船舶超载预警',
                num: data.cbczyj,
                value: data.cbczyjzb,
                className: 'stat-zycb-bg'
            },

        ]
        return (
            <div className={statClass}>
                {rows.map((m, i) => {
                    return (
                        <div className="stat-box" key={`alarmbox${i}`}>
                            <Icon className={m.className}>
                                {Array.isArray(cusIcons[m.icon]) ? (cusIcons[m.icon].map((icon, i) => <Path
                                        key={`alarm${m.icon + i}`}
                                        d={icon}/>)) :
                                    <Path d={cusIcons[m.icon]}/>}
                            </Icon>
                            <div className="num-box">
                                <span className="num-title">{m.title}</span>
                                <p>{m.num}</p>
                                <div><span className={this.getStatusClass(m.value)}>{this.getStatusNum(m.value)}%</span>月环比
                                </div>
                            </div>
                        </div>)
                })
                }
            </div>
        )
    }
}

function mapStateToProps({alarmTotal:data, stat}) {
    return {data, stat}
}

export default connect(mapStateToProps)(Alarm)