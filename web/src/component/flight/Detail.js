import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin, Card, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux'
import 'react-datetime/css/react-datetime.css'
import Datetime from '../../react-datetime/DateTime'
import moment from 'moment'
import {millToString,millToDate} from  '../util'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab
import * as cusIcons from  '../cusIcons'
import {
    getFlight
} from '../../action/flight.action'
const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

/**
 * 公司列表
 * */
class Detail extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            start: moment(new Date().valueOf() - 1000 * 60 * 60 * 24),
        }
    }

    closeCard = () => {
        const {
            changeCard
        } = this.props
        changeCard(false, [], null, null, true)
    }

    handleStart = (start) => {
        this.setState({
            start
        })
    }

    handSearch = () => {
        const {
            hxhb,
            cbmc,
            cbbc
        } = this.refs
        const param = {
            kcrq: millToDate(this.state.start.toDate().valueOf())
        }
        hxhb.value && (param.hxhb = hxhb.value)
        cbmc.value && (param.cbmc = cbmc.value)
        cbbc.value && (param.cbbc = cbbc.value)
        const {dispatch} = this.props
        dispatch(getFlight(param))
    }

    componentWillReceiveProps() {

    }

    render() {
        const {show} = this.props
        const {flight} = this.props
        const detailClass = classnames({
            'flight-list-container': true,
            active: show
        })
        return (
            <div className={detailClass}>
                <Card className={'demo-card'}>
                    <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                        <Path d={icons.close}/>
                    </Icon>}>
                        航班列表
                    </CardHeader>
                    <ul className="flight-search">
                        <li>
                            <div className="bfc-left">
                                <label>航线航班</label>
                            </div>
                            <div className="bfc-right">
                                <input className='input-common' type="text" ref="hxhb"/>
                            </div>
                        </li>
                        <li>
                            <div className="bfc-left">
                                <label>开船日期</label>
                            </div>
                            <div className="bfc-right">
                                <Datetime dateFormat="YYYY-MM-DD"
                                          closeOnSelect={true}
                                          value={this.state.start}
                                          timeFormat={false}
                                          onChange={this.handleStart}/>
                            </div>
                        </li>
                        <li>
                            <div className="bfc-left">
                                <label>船舶名称</label>
                            </div>
                            <div className="bfc-right">
                                <input className='input-common' type="text" ref="cbmc"/>
                            </div>
                        </li>
                        <li>
                            <div className="bfc-left">
                                <label>船舶班次</label>
                            </div>
                            <div className="bfc-right">
                                <input className='input-common' type="text" ref="cbbc"/>
                            </div>
                        </li>

                        <li>
                            <div className="sousuo" onClick={this.handSearch}>
                                <Icon>
                                    <Path d={cusIcons.search}/>
                                </Icon>
                            </div>
                        </li>


                    </ul>

                    <Table
                        column={[{title: '航线航班', filed: 'hxhb'},
                            {title: '开船日期', filed: 'kcrq'},
                            {title: '船舶名称', filed: 'cbmc'},
                            {title: '船舶班次', filed: 'cbbc'},
                            {title: '发船日期', filed: 'fcsj'},
                            {title: '客位数', filed: 'kws'},
                            {title: '实际乘坐人数', filed: 'sjczrs'}
                        ]}
                        className='berth-table'
                        data={flight.data}
                        pagination={false}
                        pageChange={this.handPage}
                        pageSize={10}
                        total={100}
                        auto={true}/>
                </Card>
            </div>
        )


    }
}

function mapStateToProps({flight}) {
    return {flight}
}
export default connect(mapStateToProps)(Detail)