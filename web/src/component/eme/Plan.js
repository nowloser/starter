import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {getPlan, startPlan, getCurrent} from '../../action/eme.action'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

class List extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const {dispatch, select} = this.props
        select && dispatch(getPlan({u_type: select.u_type}))
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.select !== nextProps.select) && nextProps.select) {
            const {dispatch, select} = nextProps
            const param = {u_type: select.u_type}
            select.plan_id && (param.plan_id = select.plan_id)
            select && dispatch(getPlan(param))
        }
    }

    _startPlan = (p) => {
        const {dispatch, select} = this.props
        startPlan({urgent_id: select.urgent_id, plan_id: p.plan_id}, (data) => {
            alert(data.msg)
            dispatch(getCurrent({u_type: select.u_type}))
        })
    }

    render() {
        const {plan, select} = this.props
        return (
            <div className="plan-container">
                {plan.data.map((p) => {
                    return (<div className="plan-box">
                        <p>{p.plan_name}</p>
                        <pre>{p.plan_content}</pre>
                        {select && select.plan_id === p.plan_id ? '已启动' :
                            <a onClick={this._startPlan.bind(this, p)}>启动预案</a>}
                    </div>)
                })}
            </div>
        )
    }
}

function mapProps({plan}) {
    return {plan}
}
export default connect(mapProps)(List)
