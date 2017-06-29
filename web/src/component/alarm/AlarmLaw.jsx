import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table, Select} from 'rc-ui'
import {connect} from 'react-redux';
import moment from 'moment'
import Datetime from '../../react-datetime/DateTime'
import {getLawPerson} from '../../action/alarm.action'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class AlarmLaw extends Component {
    constructor(props) {
        super(props)
        this.state = {
            begin_time: moment()
        }
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
            active: tag === now
        });
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
        const {person, info} = this.props
        return (
            <div className={this.getActive(2)}>
                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>任务名称</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text" value={info.rwbt}/>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col12">
                        <div className="bfc-left">
                            <label>任务对象</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text" value={info.yjdxmc}/>
                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col6">
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
                    <div className="col6">
                        <div className="bfc-left">
                            <label>执行人员</label>
                        </div>
                        <div className="bfc-right visibleBox">
                            <Select data={person}
                                    onChange={sel => {
                                        this.changeParam('zfryList', sel)
                                    }}/>
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

function mapProps({tag, lawInfo, lawPerson}) {
    const person = lawPerson.data.map(law => {
        return {
            label: law.xm,
            value: law.yhid
        }
    })
    return {tag, person, info: lawInfo.data[0] || {}}
}
export default connect(mapProps)(AlarmLaw)