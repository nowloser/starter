import React, {PureComponent} from 'react'
import 'rc-ui/dist/rc-ui.css'
import '../../css/chat.scss'
import Map from '../component/manager/Map'
import Total from '../component/manager/Total'
import Category from '../component/manager/Category'
import Alarm from '../component/manager/Alarm'
import Search from '../component/manager/Search'
import {Tabs, Progress, Page, Table, Icon, Modal, Button} from 'rc-ui'
import Result from '../component/manager/Result'
import Detail from '../component/manager/Detail'
import Chart from '../component/manager/Chart'
import {connect} from 'react-redux'
// import '../component/initData'


const Tab = Tabs.Tab

const Path = Icon.Path
const icons = Icon.icons


import {
    changeStat
} from '../action/map.action'

class Chat extends PureComponent {
    constructor() {
        super()
        this.state = {
            base: null,
            business: null,

            card: false,
            cardLoad: true,
            chart: false,
            className: 'common-modal',//模态框

            detail: '',//模态框
            detailClick: null,
            detailKey: 'detail',

            footer: null,

            hisCancel: null,
            hisClick: null,

            key: 233,
            keyword: '',

            list: true,//分类页

            param: {},

            res: false,//结果页

            title: '',//模态框

            width: '',
        }
    }

    /*关闭搜索*/
    closeSearch() {
        this.setState({
            list: true,
            res: false
        })
    }

    /*搜索页*/
    search(keyword) {
        if (this.state.list) {
            this.setState({
                list: false,
                res: true,
                key: this.state.key + 1,
                keyword
            })
        } else {
            this.setState({
                key: this.state.key + 1,
                keyword
            })
        }
    }

    /*选择搜索分类*/
    handType(param) {
        this.setState({
            param
        })
    }

    openModal = (detail, title, className, footer, width) => {
        this.setState({
            modal: true,
            detail,
            title,
            className: className || 'common-modal',
            footer,
            width
        })
    }

    changeCard = (card, base, business, detailClick, cardLoad, hisClick, hisCancel) => {
        this.setState({
            card,
            base,
            business,
            detailClick,
            cardLoad,
            hisClick,
            hisCancel,
            detailKey: this.state.detailKey + 1
        })
        const {dispatch} = this.props
        dispatch(changeStat(!card))
    }

    changeChart = (chart) => {
        this.setState({
            chart
        })
        const {dispatch} = this.props
        dispatch(changeStat(!chart))
    }

    render() {
        const {
            res, list, modal, title, detail, className, footer, card, base,
            business, detailClick, cardLoad, hisClick, width, chart, hisCancel, ...props
        } = this.state
        return (
            <div className="manage-page">
                {/*<Nav/>*/}
                <div className="page-container">
                    <Total openModal={this.openModal}/>
                    <Map openModal={this.openModal}
                         param={this.state.param}
                         changeCard={this.changeCard}
                         changeChart={this.changeChart}/>

                    <div className="left-container">
                        <Search res={res}
                                closeSearch={this.closeSearch.bind(this)} search={this.search.bind(this)}/>
                        <Category show={list}/>
                        <Result show={res} {...props}
                                handType={this.handType.bind(this)}/>
                    </div>
                    <Alarm/>
                    <Modal className={className} title={title} show={modal} onCancel={() => {
                        this.setState({modal: false})
                    }} footer={footer} width={width}>
                        {detail}
                    </Modal>
                    <Detail changeCard={this.changeCard} show={card} base={base} business={business}
                            detailClick={detailClick} load={cardLoad} hisClick={hisClick}
                            key={this.state.detailKey} hisCancel={hisCancel}/>

                    {chart && <Chart changeChart={this.changeChart} show={chart}/>}

                </div>
            </div>
        )
    }
}

function mapStateToProps({}) {
    return {}
}
export default  connect(mapStateToProps)(Chat)