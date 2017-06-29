import React, {Component} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {getHeader} from '../../action/map.action'
import {Dropdown, Icon, Button, Page, Spin, Progress} from 'rc-ui'
import WorkBerth from './WorkBerth'
import * as cusIcons from '../cusIcons'
const Path = Icon.Path
const icons = Icon.icons

class Total extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            show: true,
            hwyear: true,
            jzxyear: true
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getHeader())

        this.inter = setInterval(() => {
            dispatch(getHeader())
        }, 15000)
    }

    componentWillUnmount(){
       clearInterval(this.inter)
    }

    toggleShow() {
        this.setState({
            show: !this.state.show
        })
    }

    transNum = (str = '', len, little) => {
        str == null && (str = '')
        if (str.charAt(1) == '.') {
            str = '0' + str
        }

        const hw = (Math.floor(str) + '').split('')
        if (hw.length < len) {
            for (let i = hw.length; i < len; i++) {
                hw.unshift('0')
            }
        }
        let lstr = (Math.floor(parseFloat(str) * Math.pow(10, little) - Math.floor(str) * Math.pow(10, little)) || '') + ''
        if (lstr.length < little) {
            for (let i = lstr.length; i < little; i++) {
                lstr = '0' + lstr
            }
        }
        return hw.concat(lstr.split(''))
    }


    getIcon = (range) => {
        if (range > 100) {
            return <Icon className='range-top'>
                <Path d={cusIcons.top}/>
            </Icon>
        } else {
            return <Icon className='range-bottom'>
                <Path d={cusIcons.bottom}/>
            </Icon>
        }
    }

    getRange = (range) => {
        if (!range) {
            return range
        }
        if (range > 100) {
            return (+range - 100).toFixed(1)
        } else if (range <= 100) {
            return (100 - range).toFixed(1)
        }
    }

    getNumClass = (range) => {
        if (range > 100) {
            return classnames({
                "range-num": true,
                'range-num-red': true
            })
        } else if (range <= 100) {
            return classnames({
                "range-num": true,
                'range-num-green': true
            })
        }
    }

    getWorkBerth = () => {
        const {openModal} = this.props
        openModal(<WorkBerth/>, '作业泊位')
    }

    render() {
        const {data} = this.props
        const {show} = this.state


        const panelClass = classnames({
            "show-panel": true,
            active: show
        })

        let str = data.hwmonth || ''
        if (str.charAt(0) == '.') {
            str = '0' + str
        }

        let hw = (Math.floor(str) + '').split('')
        if (hw.length < 5) {
            for (let i = hw.length; i < 5; i++) {
                hw.unshift('0')
            }
        }
        return (
            <div className="total-container">
                <div className={panelClass}>
                    <div className="left-total-container">
                        <div style={{overflow: 'hidden'}}>
                            <div className="good-hor">货&nbsp;物</div>
                            <div className="good-total">
                                {this.transNum(this.state.hwyear ? data.hwyear : data.hwmonth, 5, 2).map((num, i) => {
                                    if (i == 5) {
                                        return [<div className="total-eli" key="top-eli"></div>,
                                            <div className="total-text" key={`top${i}`}>
                                                <div className="total-num-top"><p>{num}</p></div>
                                                <div className="total-num-bottom"><p>{num}</p></div>
                                            </div>]
                                    }
                                    return (<div className="total-text" key={`top${i}`}>
                                        <div className="total-num-top"><p>{num}</p></div>
                                        <div className="total-num-bottom"><p>{num}</p></div>
                                    </div>)
                                })}
                                <div className="total-range">
                                    <div className="range-box">
                                        <div
                                            className={this.getNumClass(this.state.hwyear ? data.hwyearzb : data.hwmonthzb)}>
                                            {this.state.hwyear ? this.getRange(data.hwyearzb) : this.getRange(data.hwmonthzb)}%
                                            {this.state.hwyear ? this.getIcon(data.hwyearzb) : this.getIcon(data.hwmonthzb)}
                                        </div>
                                        <div className="range-danw" onClick={() => {
                                            this.setState({hwyear: !this.state.hwyear})
                                        }}>
                                            <span>{this.state.hwyear ? '万吨/年' : '万吨/月'}</span>
                                            <Icon className='toggle-year-btn'>
                                                <Path d={icons.right}/>
                                            </Icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{overflow: 'hidden'}}>
                            <div className="good-hor">集装箱</div>
                            <div className="good-total">
                                {this.transNum(this.state.jzxyear ? data.jzxyear : data.jzxmonth, 7, 0).map((num, i) => {
                                    return (<div className="total-text" key={`bottom${i}`}>
                                        <div className="total-num-top"><p>{num}</p></div>
                                        <div className="total-num-bottom"><p>{num}</p></div>
                                    </div>)
                                })}
                                <div className="total-range">
                                    <div className="range-box">
                                        <div
                                            className={this.getNumClass(this.state.jzxyear ? data.jzxyearzb : data.jzxyearzb)}>
                                            {this.state.jzxyear ? this.getRange(data.jzxyearzb) : this.getRange(data.jzxmonthzb)}%
                                            {this.state.jzxyear ? this.getIcon(data.jzxyearzb) : this.getIcon(data.jzxmonthzb)}
                                        </div>
                                        <div className="range-danw" onClick={() => {
                                            this.setState({jzxyear: !this.state.jzxyear})
                                        }}>
                                            <span>{this.state.jzxyear ? '标箱/年' : '标箱/月'}</span>
                                            <Icon className='toggle-year-btn'>
                                                <Path d={icons.right}/>
                                            </Icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-total-container">
                        {[
                            {
                                title: '在线船舶',
                                icon: 'zycb',
                                stat: [{num: data.zxcbzs, des: '总'}, {num: data.wzcb, des: '温'}]
                            },
                            {
                                title: '500吨以下船舶',
                                icon: 'boat500',
                                stat: [{num: data.xbcb, des: '系'}, {num: data.zhcb, des: '航'}]
                            },
                            {title: '锚系船舶', icon: 'zymt', stat: [{num: data.mbcb, des: '艘'}]},
                            {
                                title: '作业泊位',
                                icon: 'rudder',
                                stat: [{num: data.bwgs, des: '作'}, {num: data.whbws, des: '危'}],
                                click: this.getWorkBerth
                            },
                            {
                                title: '安全隐患',
                                icon: 'aqyh',
                                stat: [{num: data.aqyhzs, des: '总'}, {num: data.aqyh, des: '未'}]
                            },
                            {
                                title: '督办案件',
                                icon: 'dbaj',
                                stat: [{num: data.dbajzs, des: '总'}, {num: data.dbajs, des: '未'}]
                            },
                            {
                                title: '储罐库容',
                                icon: 'ttl',
                                stat: [{num: data.whkrzs, des: '总'}, {num: data.whkr, des: '用'}]
                            },
                            {title: '高速集卡', icon: 'sfz', stat: [{num: data.gsjks, des: '辆/月'}]},
                        ].map((m, i) => {
                            return (<div className="right-total-box" key={`total-box${m.icon + i}`}
                                         onClick={m.click || function () {
                                         }}>
                                <Icon>
                                    {Array.isArray(cusIcons[m.icon]) ? (cusIcons[m.icon].map((icon, i) => <Path
                                            d={icon} key={`total${m.icon + i}`}/>)) :
                                        <Path d={cusIcons[m.icon]}/>}
                                </Icon>
                                <div className="right-content-box">
                                    <div className="right-content-title">{m.title}</div>
                                    <div>
                                        {m.stat.map((s, i) => (<div key={`statnum${i}`} className="content-number">
                                            {s.num}<span>{s.des}</span>
                                        </div>))}
                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>

                    <div className="total-toggle" onClick={this.toggleShow.bind(this)}>
                        <Icon className={'top-icon'}>
                            <Path d={show ? icons.top : icons.bottom}/>
                        </Icon>
                    </div>
                </div>
            </div>
        )


    }
}
function mapStateToProps({headerData:data}) {
    return {data}
}

export default connect(mapStateToProps)(Total)