import React, {Component} from 'react'
import '../../../css/port.scss'
import AlarmDetail from './AlarmDetail'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {getPortProduction, toggleTag, putEnd, transLaw, saveTrans, getYjsx} from '../../action/alarm.action'
import {millToString} from '../util'
import Datetime from '../../react-datetime/DateTime'
const Path = Icon.Path
const icons = Icon.icons
import * as cusIcons from  '../cusIcons'
import moment from 'moment'
import 'react-datetime/css/react-datetime.css'

class Alarm extends Component {
    constructor() {
        super();
        this.state = {
            yjlx: '全部',
            czzt: '全部',
            yjsj: ''
        }
        this.param = {}
        this.endParam = {}
        this.searchParam = {}
        this.transParam = {}
        this.page = 1
        this.transInfo = {}
        window.m = moment()
    }

    /*预警时间*/
    handleYjsj = (yjsj) => {
        this.setState({
            yjsj
        })
        this.searchParam.yjsj = yjsj ? yjsj.toDate().valueOf() : ''
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getPortProduction({}))
        dispatch(getYjsx({}))
    }

    initParam = () => {
        this.endParam = {}
        this.searchParam = {}
        this.transParam = {}
        this.transInfo = {}
    }
    /*分页*/
    handPage = (page) => {
        const {dispatch, port} = this.props
        page = Math.min(Math.ceil(port.total / 10), page)
        const param = Object.assign({}, this.param, {page, pageSize: 10})
        dispatch(getPortProduction(param))
        this.page = page
    }

    handTag(tag) {
        const {dispatch, modalFooter} = this.props
        dispatch(toggleTag(tag))
        if (tag === 2) {
            console.log(this.endParam)
            console.log(this.transParam)
            dispatch(transLaw(Object.assign({}, this.endParam, this.transParam)))
            modalFooter(<Button onClick={this.trans}>提交</Button>)
        }

    }


    /*移交执法*/
    trans = () => {
        const param = this.transInfo
        if (!param.zfryList || !param.zfryList.length) {
            alert('执行人员为空')
            return
        }
        const {info} = this.props
        saveTrans(Object.assign({}, {
            rwbt: info.rwbt,
            yjdxmc: info.yjdxmc,
            rwdxid: info.rwdxid
        }, this.endParam, this.transInfo), (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.handSearch()
        })
    }


    /*搜索*/
    handSearch = (page) => {
        const {dispatch} = this.props
        this.param = Object.assign({}, this.searchParam, {page: page || this.page, pageSize: 10})
        dispatch(getPortProduction(this.param))
    }

    handLawChange = (param) => {
        this.transParam = Object.assign(this.transParam, param)
    }

    handTransInfoChange = (param) => {
        this.transInfo = Object.assign(this.transInfo, param)
    }

    toEnd = () => {
        this.props.modalFooter(<Button key="modal-btn-bj" onClick={this.end}>办结</Button>)
    }

    toTrans = () => {
        this.props.modalFooter(<Button key="modal-btn-yjzf" onClick={this.handTag.bind(this, 2)}>移交执法</Button>)
    }

    /*处理*/
    handDeal(value, index, row) {
        this.props.handDeal(<AlarmDetail row={row}
                                         initParam={this.initParam}
                                         handLawChange={this.handLawChange}
                                         handEndChange={this.handEndChange}
                                         handTransInfoChange={this.handTransInfoChange}
                                         closeModal={this.props.closeModal}
                                         toEnd={this.toEnd}
                                         toTrans={this.toTrans}
                                         refresh={this.handSearch}/>, '报警信息')
    }

    check(value, index, row) {
        this.props.handDeal(<AlarmDetail row={row}
                                         initParam={this.initParam}
                                         handLawChange={this.handLawChange}
                                         handEndChange={this.handEndChange}
                                         handTransInfoChange={this.handTransInfoChange}
                                         closeModal={this.props.closeModal}
                                         check={true}
                                         refresh={this.handSearch}/>, '报警信息')
    }

    /*办结*/
    handEndChange = (param) => {
        this.endParam = Object.assign(this.endParam, param)
    }

    end = () => {
        const param = this.endParam
        // if(!param.czdw){
        //     alert('处置单位为空')
        //     return
        // }
        // if(!param.czqk){
        //     alert('处置情况为空')
        //     return
        // }
        putEnd(this.endParam, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.handSearch()
        })

    }

    render() {
        const {port, yjsx}=this.props;

        const column = [
            {
                title: '操作', filed: 'operate',
                render: (value, index, row) => {
                    if (row.czzt != 1 && row.czzt != 2) {
                        return (
                            <div>
                                <button className="deal-btn" onClick={this.handDeal.bind(this, value, index, row)}>受理
                                </button>
                            </div>)
                    } else {
                        return (
                            <div>
                                <button className="deal-btn" onClick={this.check.bind(this, value, index, row)}>查看
                                </button>
                            </div>)
                    }

                }
            },
            {
                title: '预警时间', filed: 'yjsj',
                render: (value, index, row) => {
                    return millToString(value)
                }
            },
            {title: '预警企业', filed: 'qymc'},
            {title: '预警船舶', filed: 'cbmc'},
            {
                title: '预警类型', filed: 'yjlx',
                render(value){
                    switch (+value) {
                        case 1:
                            return '危货作业'
                        case 2:
                            return '流量监控'
                        case  3:
                            return '证书过期'

                    }
                }
            },
            {
                title: '预警事项', filed: 'yjsx',
                render(value){
                    const res = yjsx.find(y => y.yjsx == value)
                    return res.yjsxmc
                }
            },
            {title: '处置单位', filed: 'czdw'},
            {title: '处置人', filed: 'czr'},
            {title: '处置情况', filed: 'czqk'},
            {
                title: '处置结果', filed: 'czzt',
                render(value){
                    switch (+value) {
                        case 0:
                            return '未处置'
                        case 1:
                            return '办结'
                        case 2:
                            return '移交执法'
                        case 4:
                            return '处置中'
                    }
                }
            }

        ]
        return (
            <div>
                <div className="port-top">
                    <p><span>港航自动监控</span></p>
                    <ul>
                        <li>
                            <label>预警类型</label>
                            <Dropdown overly={(<div>
                                <div className="res-menu"
                                     onClick={() => {
                                         this.setState({yjlx: '全部'})
                                         this.searchParam.yjlx = ''
                                     }}>全部
                                </div>
                                {['危货作业', '流量监控', '证书过期'].map((yjlx, i) => {
                                    return (<div className="res-menu"
                                                 onClick={() => {
                                                     this.setState({yjlx})
                                                     this.searchParam.yjlx = i + 1
                                                 }}>{yjlx}</div>)
                                })}
                            </div>)} autoClose={true} className='search-drop'>
                                <Button className={'dropdown-btn'}>
                                    {this.state.yjlx}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </li>
                        <li>
                            <label>预警时间</label>
                            <div className='search-drop'>
                                <Datetime dateFormat="YYYY-MM-DD"
                                          closeOnSelect={true}
                                          value={this.state.yjsj}
                                          timeFormat={false}
                                          onChange={this.handleYjsj}/>
                            </div>
                        </li>
                        <li>
                            <label>预警结果</label>
                            <Dropdown overly={(<div>
                                <div className="res-menu" onClick={() => {
                                    this.setState({czzt: '全部'})
                                    this.searchParam.czzt = ''
                                }}>全部
                                </div>
                                <div className="res-menu" onClick={() => {
                                    this.setState({czzt: '未处置'})
                                    this.searchParam.czzt = 0

                                }}>未处置
                                </div>
                                <div className="res-menu" onClick={() => {
                                    this.setState({czzt: '办结'})
                                    this.searchParam.czzt = 1

                                }}>办结
                                </div>
                                <div className="res-menu" onClick={() => {
                                    this.setState({czzt: '移交执法'})
                                    this.searchParam.czzt = 2

                                }}>移交执法
                                </div>
                            </div>)} autoClose={true} className='search-drop'>
                                <Button className={'dropdown-btn'}>
                                    {this.state.czzt}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </li>
                    </ul>
                    <div className="sousuo" onClick={this.handSearch.bind(this, 1)}>
                        <Icon>
                            <Path d={cusIcons.search}/>
                        </Icon>
                    </div>
                </div>
                <div className="port-list">
                    <p><span>搜索预警列表</span></p>
                    <Table column={column}
                           data={port.data}
                           className="table"
                           pagination={true}
                           pageSize={10}
                           total={port.total}
                           auto={true}
                           pageChange={this.handPage}
                           tip={true}
                    />
                </div>
            </div>
        )
    }
}

function mapProps({port, lawInfo, yjsx}) {
    return {port, yjsx: yjsx.data, info: lawInfo.data[0] || {}}
}
export default connect(mapProps)(Alarm)
