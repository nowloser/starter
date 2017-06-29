import React, {Component} from 'react'
import '../../../css/port.scss'
import ComplainDetail from './ComplainDetail.jsx'
import Add from './Add'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {millToDate} from  '../util'
import {
    getTsjkList,
    deletetsjkxxa,
    toggleTag,
    addComplain,
    putEndComplain,
    transComplainLaw,
    transReport,
    selectBase,
    saveTransComplainLaw
} from '../../action/alarm.action'
import Datetime from '../../react-datetime/DateTime'
import * as cusIcons from  '../cusIcons'

import moment from 'moment'
const Path = Icon.Path
const icons = Icon.icons
class Complain extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            selectRows: [],
            bjlx: '全部',
            czzt: '全部',
            bjsj: ''
        }
        this.param = {}
        this.addParam = {}
        this.transParam = {}
        this.endParam = {}
        this.page = 1
        this.transInfo = {}
        this.searchParam = {}
    }

    componentDidMount() {
        const {dispatch} = this.props
        /*初始化*/
        dispatch(getTsjkList({}))

        dispatch(selectBase({}))
    }


    /*报警时间*/
    handleBjsj = (bjsj) => {
        this.setState({
            bjsj
        })
        this.searchParam.bjsj = bjsj ? millToDate(bjsj.toDate().valueOf()) : ''
    }
    /*搜索*/
    handSearch = (page) => {
        const {dispatch} = this.props
        this.param = Object.assign({}, this.searchParam, {page: page || this.page, pageSize: 10})
        dispatch(getTsjkList(this.param))
    }

    /*分页*/
    handPage = (page) => {
        const {dispatch, complain} = this.props
        page = Math.min(Math.ceil(complain.total / 10), page)
        const param = Object.assign({}, this.param, {page, pageSize: 10})
        dispatch(getTsjkList(param))
        this.page = page

    }


    /*多选*/
    onSelectChange = (selectRows) => {
        this.setState({
            selectRows
        })
    }

    /*批量删除*/
    handDelete = () => {
        const {complain, dispatch}=this.props;
        if (!this.state.selectRows.length) {
            alert('请选择要删除的项目')
            return
        }
        const selects = this.state.selectRows.map((select) => {
            return complain.data[select].jjxx_id
        })
        const param = {jjxx_idArr: selects.join(',')}
        deletetsjkxxa(param, () => {
            alert('删除成功')
            this.setState({
                selectRows: []
            })
            dispatch(getTsjkList({}))
        })
    }
    initParam = () => {
        this.addParam = {}
        this.transParam = {}
        this.endParam = {}
        this.transInfo = {}
        this.searchParam = {}
    }

    /*添加*/
    addComplainHandler = () => {
        const param = this.addParam
        if (!param.bjsj) {
            alert('报警时间为空')
            return
        }
        if (!param.fysx) {
            alert('反应事项为空')
            return
        }
        if (!param.bjjb) {
            alert('报警级别为空')
            return
        }
        if (!param.bjlx) {
            alert('报警类型为空')
            return
        }
        if (!param.fyqy && !param.fybw && !param.fycb) {
            alert('报警对象为空')
            return
        }
        if (!param.fyxq) {
            alert('反应详情为空')
            return
        }

        addComplain(this.addParam, (data) => {
            if (data.success) {
                alert(data.msg)
                const {dispatch, closeModal} = this.props
                closeModal()
                dispatch(getTsjkList({}))
            } else {
                alert('失败，请稍后重试')
            }

        })

    }

    handAddChange = (param) => {
        this.addParam = param
    }

    add() {
        this.props.handDeal(<Add bjsj={this.bjsj} handAddChange={this.handAddChange}/>, '添加',
            <Button onClick={this.addComplainHandler}>保存</Button>)
    }

    /*--添加完--*/
    handTransInfoChange = (param) => {
        this.transInfo = Object.assign(this.transInfo, param)
    }

    toEnd = () => {
        this.props.modalFooter(<Button key="modal-btn-bj" onClick={this.end}>办结</Button>)
    }

    toTrans = () => {
        this.props.modalFooter(<Button key="modal-btn-yjzf" onClick={this.handTag.bind(this, 2)}>移交执法</Button>)
    }

    toEme = () => {
        this.props.modalFooter(<Button onClick={this.handTag.bind(this, 3)} key="modal-btn-yjyj">移交应急处置</Button>)
    }

    /*受理*/
    handDeal(value, index, row) {
        this.props.handDeal(<ComplainDetail row={row}
                                            initParam={this.initParam}
                                            onChange={this.handTransChange}
                                            handEndChange={this.handEndChange}
                                            closeModal={this.props.closeModal}
                                            handTransInfoChange={this.handTransInfoChange}
                                            toEnd={this.toEnd}
                                            toTrans={this.toTrans}
                                            toEme={this.toEme}
                                            refresh={this.handSearch}/>, '报警信息')
    }

    check(value, index, row) {
        this.props.handDeal(<ComplainDetail row={row}
                                            initParam={this.initParam}
                                            onChange={this.handTransChange}
                                            handEndChange={this.handEndChange}
                                            closeModal={this.props.closeModal}
                                            handTransInfoChange={this.handTransInfoChange}
                                            check={true}
                                            refresh={this.handSearch}/>, '报警信息')
    }


    /*办结*/
    handEndChange = (param) => {
        this.endParam = param
    }

    end = () => {
        putEndComplain(this.endParam, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.handSearch()
        })

    }


    /*移交执法*/
    trans = () => {
        const param = this.transInfo
        if (!param.zfryList || !param.zfryList.length) {
            alert('执行人员为空')
            return
        }
        saveTransComplainLaw(Object.assign({},this.endParam,this.transInfo), (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.handSearch()
        })
    }


    /*移交应急处理*/
    handTag(tag) {
        const {dispatch, modalFooter} = this.props
        dispatch(toggleTag(tag))
        if (tag === 2) {
            transComplainLaw(this.endParam, (data) => {
                if (data.success) {
                } else {
                    alert('失败，请稍后重试')
                }
            })
            modalFooter(<Button onClick={this.trans}>提交</Button>)
        }
        if (tag === 3) {
            modalFooter(<Button onClick={this.report}>事件初报</Button>)
        }
    }

    handTransChange = (param) => {
        this.transParam = param
    }


    /*事件初报*/
    report = () => {
        const param = this.transParam
        if (!param.title) {
            alert('标题为空')
            return
        }
        if (!param.begin_time) {
            alert('开始时间为空')
            return
        }
        if (!param.address) {
            alert('地点为空')
            return
        }
        if (!param.u_level) {
            alert('级别为空')
            return
        }
        if (!param.u_type) {
            alert('事件类型为空')
            return
        }
        if (!param.company && !param.berth && !param.vessel) {
            alert('事件关联对象为空')
            return
        }

        if (!param.reason) {
            alert('事件描述为空')
            return
        }

        transReport(Object.assign({}, this.endParam, this.transParam), (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.handSearch()
        })
    }

    render() {
        const {complain, select}=this.props;
        const {selectRows} = this.state;
        const column = [
            {
                title: '操作', filed: 'operate',
                render: (value, index, row) => {
                    if (row.czzt != 1 && row.czzt != 2 && row.czzt != 3) {
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
            {title: '报警时间', filed: 'bjsj'},
            {title: '反应企业', filed: 'qymc'},
            {title: '反应船舶', filed: 'cbmc'},
            {
                title: '反应类型', filed: 'bjlx',
                render(value){
                    return select.map.bjlx[value - 1]
                }
            },
            {title: '反应事项', filed: 'fysx'},
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
                        case 3:
                            return '移交应急'
                        case 4:
                            return '处置中'
                    }
                }
            }

        ]
        return (
            <div>
                <div className="port-top">
                    <p><span>12328投诉监控</span></p>
                    <ul>
                        <li>
                            <label>报警时间</label>
                            <div className='search-drop'>
                                <Datetime dateFormat="YYYY-MM-DD"
                                          closeOnSelect={true}
                                          value={this.state.bjsj}
                                          timeFormat={false}
                                          onChange={this.handleBjsj}/>
                            </div>
                        </li>
                        <li>
                            <label>报警类型</label>
                            <Dropdown overly={(<div>
                                <div className="res-menu"
                                     onClick={() => {
                                         this.setState({bjlx: '全部'})
                                         this.searchParam.bjlx = ''
                                     }}>全部
                                </div>
                                {select.map.bjlx.map((bjlx, i) => {
                                    return (<div className="res-menu"
                                                 onClick={() => {
                                                     this.setState({bjlx})
                                                     this.searchParam.bjlx = i + 1
                                                 }}>{bjlx}</div>)
                                })}
                            </div>)} autoClose={true} className='search-drop'>
                                <Button className={'dropdown-btn'}>
                                    {this.state.bjlx || '请选择'}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </li>
                        <li>
                            <label>处置结果</label>
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

                                <div className="res-menu" onClick={() => {
                                    this.setState({czzt: '移交应急处置'})
                                    this.searchParam.czzt = 3
                                }}>移交应急处置
                                </div>
                            </div>)} autoClose={true} className='search-drop'>
                                <Button className={'dropdown-btn'}>
                                    {this.state.czzt || '请选择'}
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
                    <p><span>搜索报警列表</span></p>
                    <div className="opt-container">
                        <Button type={'primary'} onClick={this.add.bind(this)}>
                            添加
                        </Button>
                        <Button type={'danger'} onClick={this.handDelete}>
                            批量删除
                        </Button>
                    </div>
                    <Table column={column}
                           data={complain ? complain.data : []}
                           className="table"
                           pagination={true}
                           pageSize={10}
                           total={complain.total}
                           auto={true}
                           tip={true}
                           select={{
                               onSelectChange: this.onSelectChange,
                               selectRows: selectRows
                           }}
                           pageChange={this.handPage}/>
                </div>
            </div>
        )
    }
}
function mapProps({complain, select}) {
    return {complain, select}
}
export default connect(mapProps)(Complain)

