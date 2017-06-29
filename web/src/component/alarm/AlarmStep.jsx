import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    getFlow
} from '../../action/alarm.action'
import {millToString} from '../util'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons


class AlarmStep extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, row} = this.props
        const param = {rwss_id: row.lcrwid}
        dispatch(getFlow(param))
    }


    componentWillUnmount() {
        const {dispatch} = this.props
    }

    getOpr(value){
        switch (+value){
            case 1:
                return '新增'
            case 2:
                return '转发'
            case 3:
                return '回退'
        }
    }
    render() {
        const {flowShow, flow} = this.props

        return (
            <div className="flow" style={{display: flowShow ? 'block' : 'none'}}>
                <div className="step-box">开始</div>

                {flow.data.map((f) => {
                    return (<div className="step-row">
                        <div className="step-container" style={{'display': 'inline-block'}}>
                            <div className="step-name">{this.getOpr(f.rwcsfs)}</div>
                            <div className="step-arrow"></div>
                        </div>
                        <div className="step-box">{f.cznr}</div>
                    </div>)

                })}

                <Table
                    column={[{
                        title: '任务开始时间', filed: 'create_time',
                        render(value){
                            if (value) {
                                return millToString(value)
                            }
                        }
                    },
                        {title: '执行人员', filed: 'kzxryName'},
                        {title: '处置内容', filed: 'cznr'},
                        {
                            title: '任务办结时间', filed: 'czsj',
                            render(value){
                                if (value) {
                                    return millToString(value)
                                }
                            }
                        },
                        {title: '处理意见', filed: 'clyj'}
                    ]}
                    data={JSON.parse(JSON.stringify(flow.data)).reverse()}
                    auto={true}
                    className='flow-table'/>
            </div>
        )
    }
}

function mapProps({flow}) {
    return {
        flow
    }
}
export default connect(mapProps)(AlarmStep)