import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    toggleTag,
    putTurnToComplain,
    putBackToComplain,
    getBzList,
    getRyList,
    selectBase
} from '../../action/alarm.action'
import {millToString} from '../util'
import Datetime from '../../react-datetime/DateTime'
import ComplainInfo from './ComplainInfo'
import ComplainTabs from './ComplainTabs'
import ComplainTrans from './ComplainTrans'
import ComplainLaw from './ComplainLaw'
import AlarmStep from './AlarmStep'
import moment from 'moment'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class ComplainDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            czzt: 0,
            kzxry: '',
            bz: {},
            czsj: moment(),
            slsj: props.row.slsj ? moment(props.row.slsj) : moment(),
            flowShow: false
        }

        this.endParam = {
            rwss_id: props.row.lcrwid,
            jjxx_id: props.row.jjxx_id,
            slr: props.row.slr || props.userName,
            slsj: this.state.slsj.toDate().valueOf(),
            czr: props.row.userName,
            czsj: moment().toDate().valueOf()
        }
        props.handEndChange(this.endParam)
    }


    componentDidMount() {
        const {dispatch, row} = this.props
        const param3 = {rwss_id: row.lcrwid}
        dispatch(getBzList(param3))
    }


    componentWillUnmount() {
        const {dispatch, initParam} = this.props
        dispatch(toggleTag(1))
        initParam()
    }

    getActive = (now) => {
        const {tag} = this.props
        return classNames({
            'alarm-box': true,
            active: tag === now
        });
    }

    /*转办*/
    turnTo = () => {
        const {row, dispatch} = this.props
        const {clyj} = this.refs
        const param = {}
        param.rwss_id = row.lcrwid
        param.jjxx_id = row.jjxx_id

        param.dqzrr = this.state.kzxry.kzxry || ''
        param.dqbzbh = this.state.bz.bzsxm || ''
        param.clyj = clyj.value

        param.slr = row.slr || row.userName
        param.slsj = this.state.slsj.toDate().valueOf()

        putTurnToComplain(param, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.props.refresh()
        })

    }

    /*下一步骤*/
    changeStep = (bz) => {
        const {dispatch} = this.props
        this.setState({bz})
        const param2 = {ywbz_id: bz.ywbz_id}
        dispatch(getRyList(param2))
    }

    /*回退*/
    backTo = () => {
        const {row, dispatch} = this.props
        const param = {}
        param.rwss_id = row.lcrwid
        putBackToComplain(param, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.props.refresh()
        })
    }
    flow = () => {
        console.log(1)
        this.setState({
            flowShow: !this.state.flowShow
        })
    }


    /*办结*/
    handEndChange = (type, value) => {
        this.endParam[type] = value
        this.props.handEndChange(this.endParam)
    }
    /*受理时间*/
    handleSlsj = (slsj) => {
        const {row} = this.props
        if (row.slsj) {
            return
        }
        this.setState({
            slsj
        })
        this.handEndChange('slsj', slsj.toDate().valueOf())
    }

    /*处置时间*/
    handleCzsj = (czsj) => {
        this.setState({
            czsj
        })
        this.handEndChange('czsj', czsj.toDate().valueOf())
    }

    render() {
        const {row, person, step, select, check} = this.props
        const {flowShow} = this.state
        const info = row
        return (
            <div>
                <div className={this.getActive(1)}>
                    <p>报警信息</p>
                    <ComplainInfo row={row}/>
                    <p>详细信息</p>
                    <ComplainTabs row={row}/>
                    <p>受理处置信息</p>
                    <div className="message">
                        <div className="row">
                            <div className="col4">
                                <div className="bfc-left">
                                    <label>受理人</label>
                                </div>
                                <div className="bfc-right">
                                    <input className='input-common' type="text" value={info.slr || info.userName}/>
                                </div>
                            </div>
                            <div className="col4">
                                <div className="bfc-left">
                                    <label>受理时间</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                              closeOnSelect={true}
                                              value={this.state.slsj}
                                              onChange={this.handleSlsj}/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col4">
                                <div className="bfc-left">
                                    <label>处置人</label>
                                </div>
                                <div className="bfc-right">
                                    <input className='input-common' type="text" value={info.userName}/>
                                </div>
                            </div>
                            <div className="col4">
                                <div className="bfc-left">
                                    <label>处置时间</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                              closeOnSelect={true}
                                              value={this.state.czsj}
                                              onChange={this.handleCzsj}/>
                                </div>
                            </div>
                            <div className="col4">
                                <div className="bfc-left">
                                    <label>处置结果</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    <Dropdown overly={(<div>
                                        <div className="res-menu" onClick={() => {
                                            this.setState({czzt: 0})
                                            this.handEndChange('czzt', 0)
                                        }}>未处置
                                        </div>
                                        <div className="res-menu" onClick={() => {
                                            this.setState({czzt: 1})
                                            this.handEndChange('czzt', 1)
                                            this.props.toEnd()
                                        }}>办结
                                        </div>
                                        <div className="res-menu" onClick={() => {
                                            this.setState({czzt: 2})
                                            this.handEndChange('czzt', 2)
                                            this.props.toTrans()
                                        }}>移交执法
                                        </div>
                                        <div className="res-menu" onClick={() => {
                                            this.setState({czzt: 3})
                                            this.handEndChange('czzt', 3)
                                            this.props.toEme()
                                        }}>移交应急处置
                                        </div>
                                    </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {['未处置', '办结', '移交执法', '移交应急处置'][this.state.czzt]}
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
                                    <label>处置单位</label>
                                </div>
                                <div className="bfc-right">
                                    <input className='input-common' type="text"
                                           onChange={e => this.handEndChange('czdw', e.target.value)}/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>处置情况</label>
                                </div>
                                <div className="bfc-right">
                                    <textarea className='input-common' type="text"
                                              onChange={e => this.handEndChange('czqk', e.target.value)}/>
                                </div>
                            </div>
                        </div>


                        {!check && <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>操作意见</label>
                                </div>
                                <div className="bfc-right">
                                    <input className='input-common' type="text" value={info.clyj || ''}/>
                                </div>
                            </div>
                        </div>}

                        {!check && <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>下一步意见</label>
                                </div>
                                <div className="bfc-right">
                                    <input className='input-common' type="text" ref="clyj"/>
                                </div>
                            </div>
                        </div>}


                        <div className="row">
                            {!check && <div className="col4">
                                <div className="bfc-left">
                                    <label>下一步骤</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    {/*<input className='input-common' type="text" ref="czzt"/>*/}
                                    <Dropdown overly={(<div>
                                        {step.data.map((s, i) => {
                                            return (<div key={"step" + i} className="res-menu"
                                                         onClick={this.changeStep.bind(this, s)}>{s.bzms}</div>)
                                        })}
                                    </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {this.state.bz.bzms || '请选择'}
                                            <Icon>
                                                <Path d={icons.bottom}/>
                                            </Icon>
                                        </Button>
                                    </Dropdown>

                                </div>
                            </div>}

                            {!check && <div className="col4">
                                <div className="bfc-left">
                                    <label>下一人员</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    {/*<input className='input-common' type="text" ref="czzt"/>*/}
                                    <Dropdown overly={(<div>
                                        {person.data.map((s, i) => {
                                            return (<div key={"person" + i} className="res-menu" onClick={() => {
                                                this.setState({kzxry: s})
                                            }}>{s.kzxryName}</div>)
                                        })}
                                    </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {this.state.kzxry.kzxryName || '请选择'}
                                            <Icon>
                                                <Path d={icons.bottom}/>
                                            </Icon>
                                        </Button>
                                    </Dropdown>

                                </div>
                            </div>}

                            <div className="col4">
                                {!check && <button className="opr-btn" onClick={this.turnTo}>转办</button>}
                                {!check && <button className="opr-btn" onClick={this.backTo}>回退</button>}
                                <button className="opr-btn" onClick={this.flow}>事件流程
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </button>
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                        <AlarmStep row={row} flowShow={flowShow}/>
                    </div>
                </div>
                <ComplainTrans onChange={this.props.onChange}/>
                <ComplainLaw handTransInfoChange={this.props.handTransInfoChange}/>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

function mapProps({tag, person, step, select}) {
    return {
        tag,
        person,
        step,
        select
    }
}
export default connect(mapProps)(ComplainDetail)