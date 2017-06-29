import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table, Card} from 'rc-ui'
import {connect} from 'react-redux';
import classnames from 'classnames'
import {changeTool, endEvent, getCurrent, getHistory} from '../../action/eme.action'

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

class Report extends Component {
    constructor() {
        super();
        this.state = {}

    }

    end = () => {
        const {select, dispatch} = this.props
        const param = {}

        if(!this.refs.sjzj.value){
            alert('请填写事件总结')
            return
        }
        param.urgent_id = select.urgent_id
        param.sjzj = this.refs.sjzj.value
        endEvent(param, (data) => {
            alert(data.msg)
            dispatch(getCurrent({page: 1, pageSize: 10}))
            dispatch(getHistory({page: 1, pageSize: 10}))
            dispatch(changeTool(0))
        })
    }

    closeCard = () => {
        const {dispatch} = this.props
        dispatch(changeTool(0))
        const {changeKey} = this.props
        changeKey()
    }

    render() {
        const {tool} = this.props
        const addClass = classnames({
            'end-card': true,
            active: tool === 3
        })
        return (
            <Card className={addClass}>
                <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                    <Path d={icons.close}/>
                </Icon>}>
                    归档
                </CardHeader>
                <CardBody>
                    <div className="in-box">
                        <div className="bfc-left">
                            <label>事件总结</label>
                        </div>
                        <div className="bfc-right">
                            <textarea rows="15" className='input-common' type="text" ref='sjzj'/>
                        </div>
                    </div>

                    <div className="in-box">
                        <div className="bfc-left" style={{height: '1px'}}>
                        </div>
                        <div className="bfc-right">
                            <Button type='primary' className='btn-sub' onClick={this.end}>提交</Button>
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
