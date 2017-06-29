import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {
    getWaterBasic,
    getCompanyBoats,
    getWaterEmployee,
    getWarning
} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
/**
 * 水运企业详细信息
 * */
const Path = Icon.Path
const icons = Icon.icons
class Water extends Component {
    constructor(props, context) {
        super(props, context)
    }

    getParam(others) {
        const {qybm, qymc} = this.props
        return Object.assign({qymc, qybm, ssqybm: qybm}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        const param = this.getParam.call(this, {page: 1, pageSize: 10})
        dispatch(getWaterBasic(this.getParam.call(this)))
        dispatch(getWaterEmployee(param))
        dispatch(getCompanyBoats(param))
        dispatch(getWarning(param))
    }

    handPage(select, page) {
        const {dispatch} = this.props
        const param = this.getParam.call(this, {page, pageSize: 10})
        switch (select) {
            case 1:
                dispatch(getCompanyBoats(param))
                break
            case 2:
                dispatch(getWaterEmployee(param))
                break
            case 3:
                dispatch(getWarning(param))
                break
        }
    }

    getQylx(lx) {
        switch (+lx) {
            case 1:
                return '水运企业'
            case 2:
                return '水运管理企业'
            case 3:
                return '危货企业'
            case 4:
                return '港口企业'
        }
    }

    render() {
        const {employee, warning, detail, companyBoats} = this.props

        const jjlx = function () {
            switch (+detail.jjlx){
                case 1:
                    return '国有企业'
                case 2:
                    return '集体企业'
                case 3:
                    return '有限责任公司'
            }
        }()
        const rows = [
            {field: '企业名称', value: detail.qymc},
            {field: '企业类型', value: this.getQylx(detail.qylx)},
            {field: '许可证号码', value: detail.xkzhm},
            {field: '许可经营范围', value: detail.xkjyfw},
            {field: '发证机关', value: detail.fzjg},
            {field: '许可批文号', value: detail.xkpwh},
            {field: '工商营业执照号', value: detail.gsjyzzzch},
            {field: '注册资本(万元)', value: detail.zczb},
            {field: '法定代表人', value: detail.fddbr},
            {field: '法人联系电话', value: detail.frlxdh},
            {field: '日常联系人电话', value: detail.rclxrdh},
            {field: '经济类型', value: jjlx},
            {field: '经营期限', value: detail.jyqx},
            {field: '发证日期', value: detail.fzrq},
            {field: '许可证状态', value: +detail.xkzzt === 0 ? '有效' : '失效'},
            {field: '公司工商注册地址', value: detail.gsgsczdz},
            {field: '公司现办公地址', value: detail.gsxbgdz},
            {field: '安全管理体系符合证明', value: detail.docbh},
            {field: '船舶数量（艘）', value: detail.cbsj},
            {field: '总动力(KW)', value: detail.zdl},
            {field: '海机务人员数量', value: detail.hjwrys},
            {field: '最近年审时间', value: detail.zjnssj},
            {field: '最近执法日期', value: detail.zjzfsj},
            {field: '隐患未整改数', value: detail.ffwzgs},
        ]

        // const res = rows.map((row, i) => {
        //     return (<div key={'water' + i} className="col4">
        //         <div className="bfc-left">
        //             <div className="detail-name">{row.field}</div>
        //         </div>
        //         <div className="bfc-right">
        //             <div className="detail-info">{row.value}</div>
        //         </div>
        //     </div>)
        // })
        // const resJsx = []
        // for (let i = 0; i < res.length; i += 3) {
        //     resJsx.push(<div className="row">{res[i]}{res[i + 1]}{res[i + 2]}</div>)
        // }


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
                            {/*{rows.map((row, i) => {*/}
                            {/*return (<div key={'water' + i} className="col4">*/}
                            {/*<div className="bfc-left">*/}
                            {/*<div className="detail-name">{row.field}</div>*/}
                            {/*</div>*/}
                            {/*<div className="bfc-right">*/}
                            {/*<div className="detail-info">{row.value}</div>*/}
                            {/*</div>*/}
                            {/*</div>)*/}
                            {/*})}*/}
                            <table className="detail-table">
                                <tbody>
                                {resJsx}
                                </tbody>
                            </table>
                        </div>
                    </Tab>

                    <Tab tab="船舶列表">
                        <Table
                            column={[{title: '船舶名称', filed: 'cbmc'},
                                {title: '营运证编号', filed: 'yyzbh'},
                                {title: '营运证有效期', filed: 'yyzyxq'},
                                {title: '船舶经营人', filed: 'cbjyr'},
                                {title: '船舶类型', filed: 'cblx'},
                            ]}
                            data={companyBoats.data}
                            pagination={true}
                            pageChange={this.handPage.bind(this, 1)}
                            pageSize={10}
                            total={companyBoats.total}
                            auto={true}/>
                    </Tab>

                    <Tab tab="海机务人员">
                        <Table
                            column={[{title: '姓名', filed: 'xm'},
                                {title: '身份证号', filed: 'sfzh'},
                                {title: '所属企业', filed: 'qymc'},
                                {title: '企业编码', filed: 'qybm'},
                                {
                                    title: '职务', filed: 'zw',
                                    render(value){
                                        switch (+value) {
                                            case 0:
                                                return '海务主管'
                                            case 1:
                                                return '海务管理员'
                                            case 2:
                                                return '机务主管'
                                            case 3:
                                                return '机务管理'
                                            case 4:
                                                return '总经理兼海务主管'
                                            case 5:
                                                return '副总经理兼海务主管'
                                            case 6:
                                                return '总经理兼机务主管'
                                            case 7:
                                                return '副总经理兼机务主管'

                                        }
                                    }
                                },
                                {
                                    title: '人员类型', filed: 'zsbh',
                                    render(value){
                                        switch (+value) {
                                            case 0:
                                                return '海务'
                                            case 1:
                                                return '机务'
                                        }
                                    }
                                },
                                {title: '适任证书号', filed: 'srzsh'},
                                {title: '适任证书等级', filed: 'srzsdj'},
                                {title: '联系电话', filed: 'lxdh'}
                            ]}
                            data={employee.data}
                            pagination={true}
                            pageSize={10}
                            pageChange={this.handPage.bind(this, 2)}
                            total={employee.total}
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
                            pageChange={this.handPage.bind(this, 3)}
                            auto={true}/>
                    </Tab>
                </Tabs>
            </div>
        )


    }
}

function mapStateToProps({waterEmployee:employee, warning, waterDetail, companyBoats}) {
    let detail = {}
    if (waterDetail && waterDetail.data && waterDetail.data[0]) {
        detail = waterDetail.data[0]
    }
    return {employee, detail, warning, companyBoats}
}

export default connect(mapStateToProps)(Water)