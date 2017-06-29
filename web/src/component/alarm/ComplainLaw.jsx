import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table, Select} from 'rc-ui'
import {connect} from 'react-redux';
import moment from 'moment'
import {getLawPerson} from '../../action/alarm.action'
import Datetime from '../../react-datetime/DateTime'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class ComplainLaw extends Component {
    constructor(props) {
        super(props)
        this.state = {
            begin_time: moment(),
            rwlx: -1,
            rwdx: {}
        }

        this.rwlx = ['企业', '船舶', '泊位']
        this.param = {kssj: moment().toDate().valueOf()}
        props.handTransInfoChange(this.param)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getLawPerson({}))
    }

    getActive = (now) => {
        const {tag} = this.props
        return classNames({
            'alarm-box': true,
            'trans-box': true,
            active: tag === now
        });
    }

    getData = () => {
        const {select}= this.props
        switch (this.state.rwlx) {
            case 0:
                return select.map.fyqy.map(d => {
                    return {
                        label: d.qymc,
                        value: d.gkqy_id
                    }
                })
            case 1:
                return select.map.fycb.map(d => {
                    return {
                        label: d.cbmc,
                        value: d.sycbjbxx_id
                    }
                })
            case 2:
                return select.map.fybw.map(d => {
                    return {
                        label: d.bwmc,
                        value: d.bwxx_id
                    }
                })
            default:
                return []
        }
    }

    changeParam = (type, value) => {
        this.param[type] = value
        this.props.handTransInfoChange(this.param)
    }

    handleBegin = (begin_time) => {
        this.setState({
            begin_time
        })
        this.changeParam('kssj', begin_time.toDate().valueOf())
    }

    render() {
        const {select, person} = this.props
        console.log(select)
        return (
            <div className={this.getActive(2)}>
                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>任务名称</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text"
                                   value={`${this.state.rwdx.label || ''}12328接警信息`}/>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col6">
                        <div className="bfc-left">
                            <label>任务类型</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Dropdown overly={(<div>
                                {this.rwlx.map((rwlx, i) => {
                                    return (<div className="res-menu"
                                                 onClick={() => {
                                                     this.setState({rwlx: i})
                                                     this.setState({rwdx: {}})
                                                     this.changeParam('rwdxid', '')
                                                     this.changeParam('rwbt', `12328接警信息`)
                                                     this.changeParam('rwlx', this.rwlx[i])
                                                 }}>{rwlx}</div>)
                                })}
                            </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.rwlx[this.state.rwlx] || '请选择'}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="col6">
                        <div className="bfc-left">
                            <label>执行人员</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Select data={person}
                                    onChange={sel => {
                                        this.changeParam('zfryList', sel);
                                    }}/>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>任务对象</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Dropdown overly={(<div className="select-container">
                                {this.getData().map((d, i) => {
                                    return (<div className="res-menu"
                                                 onClick={() => {
                                                     this.setState({rwdx: d})
                                                     this.changeParam('rwdxid', d.value)
                                                     this.changeParam('rwbt', `${d.label || ''}12328接警信息`)
                                                 }}>{d.label}</div>)
                                })}
                            </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.rwdx.label || '请选择'}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>开始时间</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                      closeOnSelect={true}
                                      value={this.state.begin_time}
                                      onChange={this.handleBegin}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>任务描述</label>
                        </div>
                        <div className="bfc-right">
                                <textarea className='input-common' type="text" rows="4"
                                          onChange={e => this.changeParam('rwms', e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapProps({tag, select, lawPerson}) {
    const person = lawPerson.data.map(law => {
        return {
            label: law.xm,
            value: law.yhid
        }
    })
    return {
        tag,
        select,
        person
    }
}
export default connect(mapProps)(ComplainLaw)