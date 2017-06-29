import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import Datetime from '../../react-datetime/DateTime'
const Path = Icon.Path
const icons = Icon.icons
import moment from 'moment'

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bjsj: moment(),
            bjlx: '',
            bjjb: '', //报警级别
            company: {},
            boat: {},
            berth: {}

        }
        this.param = {bjsj: moment().toDate().valueOf()}
        props.handAddChange(this.param)
    }

    changeParam = (type, value) => {
        this.param[type] = value
        this.props.handAddChange(this.param)
    }

    componentDidMount() {
    }

    handleBjsj = (bjsj) => {
        this.setState({
            bjsj
        })
        this.changeParam('bjsj', bjsj.toDate().valueOf())
    }

    changeCompany = (company) => {
        this.setState({
            company
        })
        this.changeParam('fyqy', company.gkqy_id)

    }

    changeBoat = (boat) => {
        this.setState({
            boat
        })
        this.changeParam('fycb', boat.sycbjbxx_id)

    }

    changeBerth = (berth) => {
        this.setState({
            berth
        })
        this.changeParam('fybw', berth.bwxx_id)

    }

    changeLevel = (bjjb, index) => {
        this.setState({bjjb})
        this.changeParam('bjjb', index)

    }

    render() {
        const optClass = classNames({
            'alarm-box': true,
            active: true
        });
        const {select} = this.props
        return (
            <div className={optClass}>
                <div className="message">
                    <div className="row">
                        <div className="col6">
                            <div className="bfc-left">
                                <label>报警事项</label>
                            </div>
                            <div className="bfc-right">
                                <input className='input-common' type="text" id="fysx"
                                       onChange={e => this.changeParam('fysx', e.target.value)}/>
                            </div>
                        </div>
                        <div className="col6">
                            <div className="bfc-left">
                                <label>报警时间</label>
                            </div>
                            <div className="bfc-right visibleBox">
                                <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                          closeOnSelect={true}
                                          value={this.state.bjsj}
                                          onChange={this.handleBjsj}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col6">
                            <div className="bfc-left">
                                <label>报警级别</label>
                            </div>
                            <div className="bfc-right visibleBox">
                                <Dropdown overly={
                                    (<div>
                                        {select.map.bjjb.map((s, i) => {
                                            return (<div className="res-menu"
                                                         onClick={this.changeLevel.bind(this, s, i + 1)}>{s}</div>)
                                        })}
                                    </div>)} autoClose={true}>
                                    <Button className={'dropdown-btn'}>
                                        {this.state.bjjb || '请选择'}
                                        <Icon>
                                            <Path d={icons.bottom}/>
                                        </Icon>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="col6">
                            <div className="bfc-left">
                                <label>报警类型</label>
                            </div>
                            <div className="bfc-right visibleBox" id="add-bjlx">
                                <Dropdown overly={(<div>
                                    {select.map.bjlx.map((bjlx,i) => {
                                        return (<div className="res-menu"
                                                     onClick={() => {
                                                         this.setState({bjlx})
                                                         this.changeParam('bjlx', i+1)
                                                     }}>{bjlx}</div>)
                                    })}
                                </div>)} autoClose={true}>
                                    <Button className={'dropdown-btn'}>
                                        {this.state.bjlx || '请选择'}
                                        <Icon>
                                            <Path d={icons.bottom}/>
                                        </Icon>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>反应企业</label>
                        </div>
                        <div className="bfc-right visibleBox">
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
                            <label>反应泊位</label>
                        </div>
                        <div className="bfc-right visibleBox">
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
                            <label>反应船舶</label>
                        </div>
                        <div className="bfc-right visibleBox">
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
                            <label>反应详情</label>
                        </div>
                        <div className="bfc-right">
                            <textarea className='input-common' type="text" id="fyxq"
                                   onChange={e => this.changeParam('fyxq', e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}
function mapProps({select}) {
    return {select}
}
export default connect(mapProps)(Add)
