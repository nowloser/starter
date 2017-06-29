import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {
    getBerth,
    getPier,
    getMechanical,
    getEmployee,
    getWarning,
    getDangerDetail
} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
/**
 * 船舶
 * */
const Path = Icon.Path
const icons = Icon.icons
class Danger extends Component {
    constructor(props, context) {
        super(props, context)
    }

    getParam(others) {
        const {qybm, qymc} = this.props
        return Object.assign({qymc, qybm}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        const param = this.getParam.call(this, {page: 1, pageSize: 10})
        dispatch(getDangerDetail(this.getParam.call(this)))
        dispatch(getBerth(param))
        dispatch(getPier(param))
        dispatch(getMechanical(param))
        dispatch(getEmployee(param))
        dispatch(getWarning(param))
    }

    handPage(select, page) {
        const {dispatch} = this.props
        const param = this.getParam.call(this, {page, pageSize: 10})
        switch (select) {
            case 1:
                dispatch(getBerth(param))
                break
            case 2:
                dispatch(getPier(param))
                break
            case 3:
                dispatch(getMechanical(param))
                break
            case 4:
                dispatch(getEmployee(param))
                break
            case 5:
                dispatch(getWarning(param))
                break
        }
    }

    render() {
        const {detail, berth, pier, mechanical, employee, warning} = this.props

        const sfzygkyw = function () {
            if (detail.sfzygkyw == 0) {
                return '否'
            }

            if (detail.sfzygkyw == 1) {
                return '是'
            }
        }()
        const rows = [
            {field: '企业名称', value: detail.qymc},
            {field: '企业注册资金', value: detail.qyzczj},
            {field: '企业注册地址', value: detail.qyzcdz},
            {field: '企业经营地址', value: detail.qyjydz},
            {field: '邮编', value: detail.yb},
            {field: '企业所在港口', value: detail.gkmc},
            {field: '经营许可证编号', value: detail.gkjyxkzbh},
            {field: '会计准则类别', value: detail.zxqykjzzlb},
            {field: '登记注册类型', value: detail.djzclx},
            {field: '是否主营港口业务', value: sfzygkyw},
            {field: '危货作业附证编号', value: detail.whzyfzbh},
            {field: '港口经营业务', value: detail.gkjyyw},
            {field: '所在港口类型', value: detail.gklx},
            {field: '企业负责人', value: detail.qyfzr},
            {field: '联系电话', value: detail.lxdh},
            {field: '当前安保等级', value: detail.dqabdj},
            {field: '最近年审时间', value: detail.zjnssj},
            {field: '最近执法日期', value: detail.zjzfsj},
            {field: '隐患未整改数', value: detail.ffwzgs},
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

                    <Tab tab="泊位信息">
                        <Table
                            column={[{title: '泊位名称', filed: 'bwmc'},
                                {title: '泊位属性', filed: 'bwsx'},
                                {title: '港口', filed: 'gkmc'},
                                {title: '泊位长度（米）', filed: 'bwcd'},
                            ]}
                            data={berth.data}
                            pagination={true}
                            pageSize={10}
                            pageChange={this.handPage.bind(this, 1)}
                            total={berth.total}
                            auto={true}/>
                    </Tab>

                    <Tab tab="码头信息">
                        <Table
                            column={[{title: '码头名称', filed: 'mtmc'},
                                {title: '码头类型	', filed: 'mtlx'},
                                {title: '所属港口	', filed: 'gkmc'},
                                {title: '所属港区	', filed: 'gqmc'},
                                {title: '所属岸线', filed: 'axmc'}
                            ]}
                            data={pier.data}
                            pagination={true}
                            pageSize={10}
                            total={pier.total}
                            pageChange={this.handPage.bind(this, 2)}
                            auto={true}/>
                    </Tab>

                    <Tab tab="机械设备信息">
                        <Table
                            column={[{title: '设备名称', filed: 'jxmc'},
                                {title: '所属企业', filed: 'qymc'},
                                {title: '所属港口', filed: 'gkmc'},
                                {title: '所属港区', filed: 'gqmc'},
                                {title: '设备规格', filed: 'xhgg'},
                                {title: '设备有效期（起始时间）', filed: 'syqxks'},
                                {title: '设备有效期（截止时间）', filed: 'syqxz'}
                            ]}
                            data={mechanical.data}
                            pagination={true}
                            pageSize={10}
                            pageChange={this.handPage.bind(this, 3)}
                            total={mechanical.total}
                            auto={true}/>
                    </Tab>

                    <Tab tab="从业人员">
                        <Table
                            column={[{title: '姓名', filed: 'xm'},
                                {title: '身份证号', filed: 'sfzh'},
                                {title: '所属企业', filed: 'qymc'},
                                {title: '证书类型', filed: 'zslx'},
                                {title: '证书编号', filed: 'zsbh'},
                                {title: '有效期(截止时间)', filed: 'yxq'}
                            ]}
                            data={employee.data}
                            pagination={true}
                            pageSize={10}
                            total={employee.total}
                            pageChange={this.handPage.bind(this, 4)}
                            auto={true}/>
                    </Tab>

                    <Tab tab="安全隐患">
                        <Table
                            column={[{title: '隐患排查人员', filed: 'yhpcry'},
                                {title: '隐患排查时间', filed: 'yhpcsj'},
                                {title: '隐患内容', filed: 'wtms'},
                                {title: '整改状态', filed: 'sfyjzg'},
                                {title: '整改情况', filed: 'zgqk'},
                                {title: '整改验收意见', filed: 'zgysyj'},
                                {title: '验收是否通过', filed: 'yssftg'},
                                {title: '验收人员', filed: 'ysry'},
                                {title: '验收时间', filed: 'yssj'}
                            ]}
                            data={warning.data}
                            pagination={true}
                            pageSize={10}
                            total={warning.total}
                            pageChange={this.handPage.bind(this, 5)}
                            auto={true}/>
                    </Tab>
                </Tabs>
            </div>
        )


    }
}

function mapStateToProps({berth, pier, mechanical, employee, warning, dangerDetail}) {
    let detail = {}
    if (dangerDetail && dangerDetail.data && dangerDetail.data[0]) {
        detail = dangerDetail.data[0]
    }
    return {berth, pier, mechanical, employee, warning, detail}
}

export default connect(mapStateToProps)(Danger)