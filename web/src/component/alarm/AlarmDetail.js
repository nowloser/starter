import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    putTurnTo,
    putBackTo,
    getBzList,
    getRyList,
    toggleTag
} from '../../action/alarm.action'
import {millToString} from '../util'
import Datetime from '../../react-datetime/DateTime'
import AlarmTabs from './AlarmTabs'
import AlarmStep from './AlarmStep'
import AlarmInfo from './AlarmInfo'
import AlarmLaw from './AlarmLaw'
import moment from 'moment'
const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons

class AlarmDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            czzt: 0,
            kzxry: {},
            bz: {},
            czsj: moment(),
            slsj: moment(),
            flowShow: false
        }

        props.handEndChange({
            czsj: moment().toDate().valueOf(),
            slsj: moment().toDate().valueOf(),
            rwss_id: props.row.lcrwid,
            yjxx_id: props.row.yjxx_id
        })
    }

    componentDidMount() {
        const {dispatch, row} = this.props
        const param2 = {rwss_id: row.lcrwid}
        dispatch(getBzList(param2))
    }


    componentWillUnmount() {
        const {dispatch, initParam} = this.props
        dispatch(toggleTag(1))
        initParam()
    }

    turnTo = () => {
        const {row, portDetail} = this.props
        console.log(row)
        const {clyj} = this.refs
        const param = {}
        param.rwss_id = row.lcrwid
        param.yjxx_id = row.yjxx_id
        param.dqzrr = this.state.kzxry.kzxry || ''
        param.dqbzbh = this.state.bz.bzsxm || ''
        param.clyj = clyj.value
        const info = portDetail.data[0] || {}
        param.slr = info.slr || info.userName
        param.slsj = this.state.slsj.toDate().valueOf()
        putTurnTo(param, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.props.refresh()

        })

    }

    changeStep = (bz, i) => {
        const {dispatch, step} = this.props
        if (i < step.dqbzbh - 1) {
            return
        }
        this.setState({bz})
        const param2 = {ywbz_id: bz.ywbz_id}
        dispatch(getRyList(param2))
    }


    backTo = () => {
        const {row, dispatch} = this.props
        const param = {}
        param.rwss_id = row.lcrwid

        putBackTo(param, (data) => {
            alert(data.msg)
            this.props.closeModal()
            this.props.refresh()
        })
    }

    /*办结*/
    handEndChange = (type, value) => {
        this.props.handEndChange({[type]: value})
    }
    /*受理时间*/
    handleSlsj = (slsj) => {
        const {portDetail} = this.props
        if (portDetail.data[0] && portDetail.data[0].slsj) {
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

    flow = () => {
        this.setState({
            flowShow: !this.state.flowShow
        })
    }

    componentWillReceiveProps(nextProps) {
        const {portDetail, handLawChange} = nextProps
        const info = portDetail.data[0]
        if (info) {
            if (info.slsj) {
                console.log(info.slsj)
                setTimeout(() => {
                    this.handleSlsj(moment(info.slsj))
                }, 1000)
            }

            if (info.userName) {
                this.handEndChange('czr', info.userName)
                this.handEndChange('slr', info.slr || info.userName)
            }
            // handLawChange({})
        }
    }

    getActive = (now) => {
        const {tag} = this.props
        return classNames({
            'alarm-box': true,
            active: tag === now
        });
    }

    render() {
        const {row, portDetail, person, step, handLawChange, handTransInfoChange, check} = this.props
        const {flowShow} = this.state
        const info = portDetail.data[0] || {}

        return (
            <div>
                <div className={this.getActive(1)}>
                    <p>预警信息</p>
                    <AlarmInfo row={row}/>
                    <p>详细信息</p>
                    <AlarmTabs row={row} handLawChange={handLawChange}/>
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
                                              value={info.slsj ? moment(info.slsj) : this.state.slsj}
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
                                <div className="bfc-right visibleBox" id="czzt">
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
                                    </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {['未处置', '办结', '移交执法'][this.state.czzt]}
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
                                    <Dropdown overly={(<div>
                                        {step.data.map((s, i) => {
                                            return (<div key={"step" + i} className="res-menu"
                                                         onClick={this.changeStep.bind(this, s, i)}>{s.bzms}</div>)
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
                                    <Dropdown overly={(<div>
                                        {person.data ? person.data.map((s, i) => {
                                                return (<div key={"person" + i} className="res-menu" onClick={() => {
                                                    this.setState({kzxry: s})
                                                }}>{s.kzxryName}</div>)
                                            }) : []}
                                    </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {this.state.kzxry.kzxryName || '请选择'}
                                            <Icon>
                                                <Path d={icons.bottom}/>
                                            </Icon>
                                        </Button>
                                    </Dropdown>

                                </div>

                            </div>
                            }
                            <div className="col4">
                                {!check && <button className="opr-btn" onClick={this.turnTo}>转办</button>}
                                {!check && info.backStatus == 1 &&
                                <button className="opr-btn" onClick={this.backTo}>回退</button>}
                                <button className="opr-btn" onClick={this.flow}>事件流程<Icon>
                                    <Path d={icons.bottom}/>
                                </Icon></button>
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                        {/*流程图*/}
                        <AlarmStep row={row} flowShow={flowShow}/>
                    </div>
                </div>
                < AlarmLaw
                    handTransInfoChange={handTransInfoChange}/>
                <div
                    style={{clear: 'both'}}></div>
            </div >
        )
    }
}

function mapProps({portDetail, tag, person, step}) {
    return {
        portDetail,
        tag,
        person,
        step
    }
}
export default connect(mapProps)(AlarmDetail)