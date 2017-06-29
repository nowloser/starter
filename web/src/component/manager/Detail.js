import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin, Card, Tabs} from 'rc-ui'
import {connect} from 'react-redux'
import 'react-datetime/css/react-datetime.css'
import Datetime from '../../react-datetime/DateTime'
import moment from 'moment'
import {millToString} from  '../util'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab


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
            select: 0,//分类
            pageSize: 10,
            current: -1,
            tag: false,
            start: moment(new Date().valueOf() - 1000 * 60 * 60 * 24),
            end: moment(),
            his: false
        }
    }

    closeCard = () => {
        const {
            changeCard, hisCancel = function () {
        }
        } = this.props
        changeCard(false, [], null, null, true)
        hisCancel()
    }

    handHisClick = () => {
        this.setState({
            his: !this.state.his
        })
    }

    handHisCancel = () => {
        this.handHisClick()
        this.props.hisCancel && this.props.hisCancel()
    }
    handleStart = (start) => {
        this.setState({
            start
        })
    }

    handleEnd = (end) => {
        this.setState({
            end
        })
    }

    handSearch = () => {
        const {hisClick} = this.props
        const param = {
            startdate: millToString(this.state.start.toDate().valueOf()),
            enddate: millToString(this.state.end.toDate().valueOf())

        }
        hisClick(param)
    }

    componentWillReceiveProps() {

    }

    render() {
        const {base, business, show, detailClick, load, hisClick} = this.props
        const detailClass = classnames({
            'detail-win': true,
            active: show
        })
        return (
            <div className={detailClass}>
                <Card className={'demo-card'}>
                    <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                        <Path d={icons.close}/>
                    </Icon>}>
                        信息
                    </CardHeader>
                    {load && <div className="loading-container">
                        <Spin/>
                    </div>}
                    {!business && base && <div className="base-detail">{
                        base.map((b) => {
                            return (<div className="info-win"><label>{b.field}:</label>{b.value}</div>)
                        })}</div>}
                    {business && <Tabs className={'win-tab'}>
                        <Tab tab="基础信息">
                            {base && base.map((b, i) => {
                                return (
                                    <div className="info-win" key={"base" + i}><label>{b.field}:</label>{b.value}</div>)
                            })}
                        </Tab>

                        <Tab tab="业务信息">
                            {business && business.map((b, i) => {
                                return (
                                    <div className="info-win" key={"business" + i}><label>{b.field}:</label>{b.value}
                                    </div>)
                            })}
                        </Tab>
                    </Tabs>}

                    {detailClick && <div className="info-detail-link" onClick={detailClick}>
                        <Icon>
                            <Path d={icons.right}/>
                        </Icon>
                        <div className="detail-href">详细信息</div>
                    </div>}

                    {hisClick && <div className="info-detail-link" onClick={this.handHisClick}>
                        <Icon>
                            <Path d={icons.right}/>
                        </Icon>
                        <div className="detail-href">历史轨迹</div>
                    </div>}

                    <div style={{display: this.state.his ? 'block' : 'none'}}>
                        <div className="trail-box">
                            <div className="bfc-left">
                                <label>开始时间</label>
                            </div>
                            <div className="bfc-right his-time-box">
                                <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                          closeOnSelect={true}
                                          value={this.state.start}
                                          onChange={this.handleStart}/>
                            </div>
                        </div>

                        <div className="trail-box">
                            <div className="bfc-left">
                                <label>结束时间</label>
                            </div>
                            <div className="bfc-right his-time-box">
                                <Datetime dateFormat="YYYY-MM-DD HH:mm:ss"
                                          closeOnSelect={true}
                                          value={this.state.end}
                                          onChange={this.handleEnd}/>
                            </div>
                        </div>

                        <div className="trail-box">
                            <Button onClick={this.handSearch}>查询</Button>
                            <Button onClick={this.handHisCancel}>取消</Button>
                        </div>
                    </div>
                </Card>
            </div>
        )


    }
}

function mapStateToProps({company:data}) {
    return {data}
}

export default connect(mapStateToProps)(Detail)