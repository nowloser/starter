import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table, Card} from 'rc-ui'
import {connect} from 'react-redux';
import * as cusIcons from '../cusIcons';
import classnames from 'classnames'
import {changeTool, report, getAddInfo, getCurrent} from '../../action/eme.action'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

import Datetime from '../../react-datetime/DateTime'

import moment from 'moment'
import {millToString} from '../util'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

class Add extends Component {
    constructor() {
        super();
        this.state = {
            jwd: '',
            degree: 0,
            begin_time: moment(),
            level: 0,
            type: {}
        }

    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getAddInfo({}))
    }

    drawCompleted = (eventArgs) => {
        const geometry = eventArgs.feature.geometry;
        this.setState({
            jwd: geometry.x + ',' + geometry.y
        })
        this.drawPoint.deactivate();

    }
    handleBegin = (begin_time) => {
        this.setState({
            begin_time
        })
        // this.changeParam('begin_time', begin_time.toDate().valueOf())
    }

    addAdd = () => {
        const map = window.map.getInstance()
        this.vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
        //实例化一个 DrawFe
        this.drawPoint = new SuperMap.Control.DrawFeature(this.vectorLayer, SuperMap.Handler.Point);
        this.drawPoint.events.on({"featureadded": this.drawCompleted});
        //map上添加控件
        map.addControl(this.drawPoint);
        //激活控件
        this.drawPoint.activate();
    }
    closeCard = () => {
        const {dispatch} = this.props
        dispatch(changeTool(0))
        const {changeKey} = this.props
        changeKey()
    }
    _report = () => {
        const {title, address, reason} = this.refs
        const param = {}
        if (!title.value) {
            alert('请填写事件标题')
            return
        }
        if (!address.value) {
            alert('请填写事件地址')
            return
        }
        if (!this.state.jwd) {
            alert('请填写事件经纬度')
            return
        }
        if (!this.state.level && this.state.level !== 0) {
            alert('请填写事件级别')
            return
        }

        if (!this.state.type) {
            alert('请填写事件类型')
            return
        }
        if (!reason.value) {
            alert('请填写事件描述')
            return
        }
        param.title = title.value
        param.address = address.value
        param.reason = reason.value
        param.begin_time = millToString(this.state.begin_time.toDate().valueOf())
        param.jd = this.state.jwd.split(',')[0]
        param.wd = this.state.jwd.split(',')[1]
        param.status = this.state.degree + 1
        param.u_level = this.state.level + 1
        param.u_type = this.state.type.value

        const {changeKey} = this.props
        report(param, (data) => {
            alert(data.msg)
            const {dispatch} = this.props
            dispatch(changeTool(0))
            changeKey()
        })
    }

    render() {
        const {tool, addInfo} = this.props
        const addClass = classnames({
            'add-card': true,
            active: tool === 1
        })
        return (
            <Card className={addClass}>
                <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                    <Path d={icons.close}/>
                </Icon>}>
                    事件上报
                </CardHeader>
                <CardBody>
                    {/*事件标题*/}
                    <div className="in-box">
                        <div className="bfc-left">
                            <label>事件名称</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text" ref='title'/>
                        </div>
                    </div>

                    <div className="in-box">

                        <div className="bfc-left">
                            <label>事件类型</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Dropdown overly={(
                                <div>
                                    {addInfo.sjlx.map((s, i) => {
                                        return (<div key={"sjlx" + i} className="res-menu" onClick={() => {
                                            this.setState({type: s})
                                        }}>{s.value}</div>)
                                    }) }
                                </div>)} autoClose={true}>
                                <Button className={'dropdown-btn'}>
                                    {this.state.type.value || '请选择'}
                                    <Icon>
                                        <Path d={icons.bottom}/>
                                    </Icon>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="in-box">
                        <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>发生时间</label>
                                </div>
                                {/*<div className="bfc-right">*/}
                                {/*<DatePicker*/}
                                {/*placeholderText=""*/}
                                {/*className='input-common'*/}
                                {/*dateFormat="YYYY-MM-DD HH:mm:ss"*/}
                                {/*selected={this.state.begin_time}*/}
                                {/*onChange={this.handleBegin}/>*/}
                                {/*</div>*/}

                                <div className="bfc-right visibleBox">
                                    <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                              closeOnSelect={true}
                                              value={this.state.begin_time}
                                              onChange={this.handleBegin}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="in-box">
                        <div className="bfc-left">
                            <label>发生地点</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text" ref="address"/>
                        </div>
                    </div>

                    <div className="in-box">
                        <div className="bfc-left">
                            <label>经纬度</label>
                        </div>
                        <div className="bfc-right db-in-box">
                            <input className='input-common' type="text" value={this.state.jwd}/>
                            <Button onClick={this.addAdd}><Icon>
                                <Path d={cusIcons.pos}/>
                            </Icon></Button>
                        </div>
                    </div>

                    {/*<div className="in-box">*/}

                    {/*<div className="bfc-left">*/}
                    {/*<label>事件级别</label>*/}
                    {/*</div>*/}
                    {/*<div className="bfc-right">*/}
                    {/*<input className='input-common' type="text"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}


                    <div className="in-box">
                        <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>事件级别</label>
                                </div>
                                <div className="bfc-right visibleBox">
                                    <Dropdown overly={(
                                        <div>
                                            {['一般', '较大', '重大', '特别重大'].map((s, i) => {
                                                return (<div key={"degree" + i} className="res-menu" onClick={() => {
                                                    this.setState({level: i})
                                                }}>{s}</div>)
                                            }) }
                                        </div>)} autoClose={true}>
                                        <Button className={'dropdown-btn'}>
                                            {['一般', '较大', '重大', '特别重大'][this.state.level]}
                                            <Icon>
                                                <Path d={icons.bottom}/>
                                            </Icon>
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="in-box">

                        <div className="bfc-left">
                            <label>事件描述</label>
                        </div>
                        <div className="bfc-right">
                            <textarea rows="10" className='input-common' type="text" ref="reason"/>
                        </div>
                    </div>

                    <div className="in-box">

                        <div className="bfc-left" style={{height: '1px'}}>

                        </div>
                        <div className="bfc-right">
                            <Button type='primary' className='btn-sub' onClick={this._report}>提交</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

function mapProps({tool, addInfo}) {
    return {tool, addInfo: addInfo.map}
}
export default connect(mapProps)(Add)
