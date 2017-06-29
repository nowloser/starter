/**
 * 泊位详细信息
 * */

import React, {Component} from 'react'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {
    getBerthDetail
} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
class Water extends Component {
    constructor(props, context) {
        super(props, context)
    }

    getParam(others) {
        const {bwxx_id} = this.props
        return Object.assign({bwxx_id}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getBerthDetail(this.getParam.call(this)))
    }


    render() {
        const {detail} = this.props
        const rows = [
            {field: '泊位名称', value: detail.bwmc},
            {field: '泊位代码', value: detail.bwdm},
            {field: '泊位属性', value: detail.bwsx},
            {field: '所在水系', value: detail.bwszsx},
            {field: '生产类型', value: detail.sclx},
            {field: '服务类型', value: detail.fwlx},
            {field: '结构形式', value: detail.jgxs},
            {field: '主要用途', value: detail.zyyt},
            {field: '投产年份', value: detail.tcnf},
            {field: '竣工验收年份', value: detail.jgysnf},
            {field: '数据所属机构编码', value: detail.sjssjgbm},
            {field: '泊位长度', value: detail.bwcd},
            {field: '经度', value: detail.jd},
            {field: '纬度', value: detail.wd},
            {field: '港口名称', value: detail.gkmc},
            {field: '前沿水深设计(米)', value: detail.qysss4j},
            {field: '前沿水深实际(米)', value: detail.qysss2j},
            {field: '设计靠泊能力(吨级)', value: detail.sjkbnl},
            {field: '泊位设计年通过能力-散装、件杂货物(万吨)', value: detail.sjntg_sz},
            {field: '泊位设计年通过能力-集装箱(万TEU)', value: detail.sjntg_jzxt},
            {field: '泊位设计年通过能力-集装箱(万吨)', value: detail.sjntg_jzxd},
            {field: '泊位设计年通过能力-旅客(万人)', value: detail.sjntg_lk},
            {field: '泊位设计年通过能力-滚装汽车(万标辆)', value: detail.sjntg_gzqcb},
            {field: '泊位设计年通过能力-滚装汽车(万辆)', value: detail.hcntg_sz},
            {field: '泊位核查年通过能力-散装、件杂货物(万吨)', value: detail.hcntg_jzxt},
            {field: '泊位核查年通过能力-集装箱(万TEU)', value: detail.hcntg_jzxd},
            {field: '泊位核查年通过能力-集装箱(万吨)', value: detail.hcntg_lk},
            {field: '泊位核查年通过能力-旅客(万人)', value: detail.hcntg_gzqcb},
            {field: '泊位核查年通过能力-滚装汽车(万标辆)', value: detail.hcntg_gzqc},
            {field: '泊位核查年通过能力-滚装汽车(万辆)', value: detail.sjntg_gzqc}
        ]
        const res = []
        rows.forEach((row, i) => {
            res.push(<td>{row.field}</td>)
            res.push(<td>{row.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 6) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}{res[i + 2]}{res[i + 3]}{res[i + 4]}{res[i + 5]}</tr>)
        }

        return (
            <div>
                <Tabs className={'detail-tab'}>
                    <Tab tab="详细信息">
                        <div className="row">
                            <table className="detail-table">
                                <tbody>
                                {resJsx}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )


    }
}

function mapStateToProps({berthDetail}) {
    const detail = berthDetail.data[0] || {}
    return {detail}
}

export default connect(mapStateToProps)(Water)