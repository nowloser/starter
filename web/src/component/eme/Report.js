import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table, Card} from 'rc-ui'
import {connect} from 'react-redux';
import classnames from 'classnames'
import {changeTool, reReport,getReList} from '../../action/eme.action'
import Datetime from '../../react-datetime/DateTime'
import 'react-datetime/css/react-datetime.css'
import moment from 'moment'
import {millToString} from '../util'

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

class Report extends Component {
    constructor() {
        super();
        this.state = {
            operate_date: moment()
        }
    }

    handleTime = (operate_date) => {
        this.setState({
            operate_date
        })
    }
    closeCard = () => {
        const {dispatch} = this.props
        dispatch(changeTool(0))
        const {changeKey} = this.props
        changeKey()
    }

    _report = () => {
        const {content, mark} = this.refs
        const {select} = this.props
        const param = {}
        if(!content.value){
            alert('请填写处置内容')
            return
        }
        param.urgent_id = select.urgent_id
        param.czjg = content.value
        param.remark = mark.value
        param.operate_date = millToString(this.state.operate_date.toDate().valueOf())
        const {changeKey} = this.props
        reReport(param, (data) => {
            alert(data.msg)
            const {dispatch} = this.props
            dispatch(changeTool(0))
            dispatch(getReList({urgent_id: select.urgent_id}))
            changeKey()
        })
    }


    render() {
        const {tool} = this.props
        const addClass = classnames({
            're-card': true,
            active: tool === 2
        })
        return (
            <Card className={addClass}>
                <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                    <Path d={icons.close}/>
                </Icon>}>
                    事件处置
                </CardHeader>
                <CardBody>
                    <div className="in-box">
                        <div className="row">
                            <div className="col12">
                                <div className="bfc-left">
                                    <label>处置时间</label>
                                </div>
                                {/*<div className="bfc-right">*/}
                                    {/*<DatePicker*/}
                                        {/*placeholderText=""*/}
                                        {/*className='input-common'*/}
                                        {/*dateFormat="YYYY-MM-DD HH:mm:ss"*/}
                                        {/*selected={this.state.operate_date}*/}
                                        {/*onChange={this.handleTime}/>*/}
                                {/*</div>*/}

                                <div className="bfc-right visibleBox">
                                    <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                              closeOnSelect={true}
                                              value={this.state.operate_date}
                                              onChange={this.handleTime}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="in-box">
                        <div className="bfc-left">
                            <label>处置内容</label>
                        </div>
                        <div className="bfc-right">
                            <input className='input-common' type="text" ref='content'/>
                        </div>
                    </div>
                    <div className="in-box">
                        <div className="bfc-left">
                            <label>备注</label>
                        </div>
                        <div className="bfc-right">
                            <textarea rows="10" className='input-common' type="text" ref='mark'/>
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

function mapProps({tool}) {
    return {tool}
}
export default connect(mapProps)(Report)
