import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {setCenter, getYearVerify, getBoatDetail} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
/**
 * 船舶
 * */
const Path = Icon.Path
const icons = Icon.icons
class Water extends Component {
    constructor(props, context) {
        super(props, context)
    }


    getParam(others) {
        const {cb_id} = this.props
        return Object.assign({cb_id}, others)
    }

    componentDidMount() {
        const {dispatch, mmsi} = this.props
        const param = this.getParam.call(this, {page: 1, pageSize: 10})
        dispatch(getYearVerify(param))
        dispatch(getBoatDetail({mmsi}))
    }


    handPage(select, page) {
        const {dispatch} = this.props
        const param = this.getParam.call(this, {page, pageSize: 10})
        switch (select) {
            case 1:
                dispatch(getYearVerify(param))
                break
            case 2:
                break
        }
    }


    render() {
        const {verify, detail} = this.props
        const rows = [
            {field: '船舶名称', value: detail.cbmc},
            {field: '曾用名', value: detail.cym},
            {field: '所属企业', value: detail.qymc},
            {field: '船舶所有人', value: detail.cbsyr},
            {field: '船舶经营人', value: detail.cbjyr},
            {field: '船舶管理人', value: detail.cbglr},
            {field: '船舶识别号', value: detail.cbsbh},
            {field: '船舶登记号', value: detail.cbdjh},
            {field: '船检证书号', value: detail.cjzsh},
            {field: '运营证编号', value: detail.yyzbh},
            {field: '运营证有效期', value: detail.yyzyxq},
            {field: '发证机关', value: detail.fzjg},
            {field: '发证日期', value: detail.fzrq},
            {field: '运输形式', value: (function (val) {
                switch (+val){
                    case 1:
                        return '省际运输企业'
                    case 2:
                        return '省内运输企业'
                }
            })(detail.ysxs)},
            {field: '经营航区', value: (function (val) {
                switch (+val){
                    case 1:
                        return '沿海'
                    case 2:
                        return '内河'
                }
            })(detail.jyhq)},
            {field: '船舶类型划分', value: detail.cblxhf},
            {field: '船舶类型', value: detail.cblx},
            {field: '管理人许可证', value: detail.glrxkzh},
            {field: '船舶经营方式', value: (function (val) {
                switch (+val){
                    case 1:
                        return '自有'
                    case 2:
                        return '光租'
                    case 3:
                        return '融资租赁'
                }
            })(detail.cbjyfs)},
            {field: '总吨', value: detail.zd},
            {field: '立方米', value: detail.lfm},
            {field: '载货吨', value: detail.zhd},
            {field: '净吨', value: detail.jd},
            {field: '载气量', value: detail.zql},
            {field: '船舶TEU', value: detail.cbteu},
            {field: '车位', value: detail.cw},
            {field: '客位', value: detail.kw},
            {field: '主机功率', value: detail.zjgl},
            {field: '主机台数', value: detail.zjts},
            {field: '材质', value: detail.cz},
            {field: '建造日期', value: detail.jzrq},
            {field: '改建日期', value: detail.gjrq},
            {field: '座位', value: detail.zw},
            {field: '卧位', value: detail.ww},
            {field: '本船核定经营范围', value: detail.bchdjyfw},
            {field: '辖区港航部门', value: detail.xqghbm},
            {field: '船籍港', value: detail.cjg},
            {field: '办证类型', value: detail.bzlx},
            {field: '办证日期', value: detail.bzrq},
            {field: '委托合同经营开始时间', value: detail.wthtjykssj},
            {field: '委托合同经营结束时间', value: detail.wthtjyjssj},
            {field: '光租船舶有效日期', value: detail.gzcbyxrq},
            {field: '年审合格证有效日期', value: detail.nshgzyxrq},
            {field: '是否老旧船', value: (function (val) {
                switch (+val){
                    case 0:
                        return '否'
                    case 1:
                        return '是'
                }
            })(detail.sfljc)},
            {field: '是否淘汰', value:  (function (val) {
                switch (+val){
                    case 0:
                        return '否'
                    case 1:
                        return '是'
                }
            })(detail.sfljc)},
            {field: '船舶险金额', value: detail.cbxje},
            {field: '船员险金额', value: detail.cyxje},
            {field: '船舶最低配员要求', value: detail.cbzdpyyq},
            {field: '备注', value: detail.bz},
            {field: '经度', value: detail.jd},
            {field: 'MMSI', value: detail.mmsi},
            {field: '纬度', value: detail.wd},
            {field: 'IMO号', value: detail.imo},
            {field: '速度', value: detail.sd != null && detail.sd + '节'},
            {field: '航向', value: detail.hx},
            {field: '船首向', value: detail.csx != null && detail.csx + '度'},
            {field: '状态', value: detail.cbhxzt},
            {field: '长度', value: detail.cbcd != null && detail.cbcd + '米'},
            {field: '更新时间', value: detail.cwgxsj},
            {field: '宽度', value: detail.cbkd != null && detail.cbkd + '米'},
            {field: '吃水', value: detail.cbcs != null && detail.cbcs + '米'}
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
                        <table className="detail-table">
                            <tbody>
                            {resJsx}
                            </tbody>
                        </table>
                    </Tab>

                    <Tab tab="船舶合格证年审">
                        <Table column={[
                            {title: '船名', filed: 'shscm'},
                            {title: '船舶营运证编号', filed: 'cbyyzbh'},
                            {title: '船舶营运证有效期', filed: 'cbnshgzyxq'},
                            {
                                title: '审核结果', filed: 'shjg',
                                render(value){
                                    switch (+value) {
                                        case -1:
                                            return '审核中'
                                        case 0:
                                            return '审核不通过'
                                        case 1:
                                            return '审核通过'
                                    }
                                }
                            },
                            {title: '审核年份', filed: 'shnf'},
                            {title: '审核时间', filed: 'shsj'}
                        ]}
                               data={verify.data}
                               pagination={true}
                               pageSize={10}
                               total={verify.total}
                               pageChange={this.handPage.bind(this, 1)}
                               auto={true}/>
                    </Tab>


                </Tabs>
            </div>
        )


    }
}

function mapStateToProps({verify, boatDetail}) {

    let detail = {}
    if (boatDetail && boatDetail.data && boatDetail.data[0]) {
        detail = boatDetail.data[0]
    }
    return {verify, detail}
}

export default connect(mapStateToProps)(Water)