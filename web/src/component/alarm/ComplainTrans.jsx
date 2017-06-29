import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import Datetime from '../../react-datetime/DateTime'
import moment from 'moment'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class ComplainTrans extends Component {
    constructor(props) {
        super(props)
        this.state = {
            begin_time: moment(),
            u_level: '',
            u_type: '',
            company: {},
            boat: {},
            berth: {}
        }

        this.param = {begin_time: moment().toDate().valueOf()}
        props.onChange(this.param)
    }

    getActive = (now) => {
        const {tag} = this.props
        return classNames({
            'alarm-box': true,
            active: tag === now
        });
    }


    changeParam = (type, value) => {
        this.param[type] = value
        this.props.onChange(this.param)
    }


    /*移交应急*/
    handleBegin = (begin_time) => {
        this.setState({
            begin_time
        })
        this.changeParam('begin_time', begin_time.toDate().valueOf())
    }

    changeLevel = (u_level) => {
        this.setState({u_level})
        this.changeParam('u_level', u_level)

    }
    changeCompany = (company) => {
        this.setState({
            company
        })
        this.changeParam('company', company.gkqy_id)

    }

    changeBoat = (boat) => {
        this.setState({
            boat
        })
        this.changeParam('vessel', boat.sycbjbxx_id)

    }

    changeBerth = (berth) => {
        this.setState({
            berth
        })
        this.changeParam('berth', berth.bwxx_id)

    }


    render() {
        const {select} = this.props
        return (
            <div className={this.getActive(3)}>
                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>事件标题</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text"
                                   onChange={e => this.changeParam('title', e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col6">
                        <div className="bfc-left">
                            <label>事件时间</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                      closeOnSelect={true}
                                      value={this.state.begin_time}
                                      onChange={this.handleBegin}/>
                        </div>
                    </div>
                    <div className="col6">
                        <div className="bfc-left">
                            <label>事件地点</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text"
                                   onChange={e => this.changeParam('address', e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col6">
                        <div className="bfc-left">
                            <label>事件级别</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Dropdown overly={
                                (<div>
                                    {select.map.bjjb.map(s => {
                                        return (<div className="res-menu"
                                                     onClick={this.changeLevel.bind(this, s)}>{s}</div>)
                                    })}
                                </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.u_level || '请选择'}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="col6">
                        <div className="bfc-left">
                            <label>事件类型</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Dropdown overly={(<div>

                                {['地震','水灾','危险品泄漏'].map(s => {
                                    return (<div className="res-menu"
                                                 onClick={() => {
                                                     this.setState({u_type: s})
                                                     this.changeParam('u_type', s)
                                                 }}>{s}</div>)
                                })}
                            </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.u_type || '请选择'}
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
                            <label>事件关联企业</label>
                        </div>
                        <div className="bfc-right visibleBox-large">
                            <Dropdown overly={
                                (<div className="select-container">
                                    {select.map.fyqy.map(s => {
                                        return (<div className="res-menu"
                                                     onClick={this.changeCompany.bind(this, s)}>{s.qymc}</div>)
                                    })}

                                </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.company.qymc || '请选择'}
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
                            <label>事件关联泊位</label>
                        </div>
                        <div className="bfc-right visibleBox-large">
                            {/*<input className='input-common' type="text" id="fymt"/>*/}

                            <Dropdown overly={
                                (<div className="select-container">
                                    {select.map.fybw.map(s => {
                                        return (<div className="res-menu"
                                                     onClick={this.changeBerth.bind(this, s)}>{s.bwmc}</div>)
                                    })}

                                </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.berth.bwmc || '请选择'}
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
                            <label>事件关联船舶</label>
                        </div>
                        <div className="bfc-right visibleBox-large">
                            <Dropdown overly={
                                (<div className="select-container">
                                    {select.map.fycb.map(s => {
                                        return (<div className="res-menu"
                                                     onClick={this.changeBoat.bind(this, s)}>{s.cbmc}</div>)
                                    })}

                                </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.boat.cbmc || '请选择'}
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
                            <label>事件原因描述</label>
                        </div>
                        <div className="bfc-right">
                                <textarea className='input-common' type="text"
                                          onChange={e => this.changeParam('reason', e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapProps({tag, select}) {
    return {
        tag,
        select
    }
}
export default connect(mapProps)(ComplainTrans)