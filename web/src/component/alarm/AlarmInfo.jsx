import React, {Component} from 'react'
import '../../../css/alarm.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    getPortProductionDetail,
    clearPortProductionDetail
} from '../../action/alarm.action'
import {millToString} from '../util'
const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons

class AlarmInfo extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, row} = this.props
        const param = {yjxx_id: row.yjxx_id}
        dispatch(getPortProductionDetail(param))
    }


    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(clearPortProductionDetail())
    }


    getYjsj(code) {
        switch (+code) {
            case 1:
                return '危货企业未申报作业预警'
            case 2:
                return '危险作业申报-危货码头停普通船'
            case 3:
                return '危险作业申报-小码头靠大船'
            case 4:
                return '危险作业申报-船舶超载靠泊位预警'
            case 5:
                return '危险作业申报-未在规定的时间内作业'
            case 6:
                return '危险作业申报-未在规定的时间内申报'
            case 7:
                return '危险作业申报-危货品与港口经营许可不同'
            case 8:
                return '流量监控-流量监控点超载预警'
            case 9:
                return '证书过期类-船舶年审合格证到期前30天'
            case 11:
                return '证书过期类-船舶经营许可证到期前30天'
            case 13:
                return '证书过期类-船舶营运检验证到期前30天'
            case 15:
                return '证书过期类-水运企业营运许可证到期前30天'
            case 17:
                return '证书过期类-港口企业营运许可证到期前30天'
            case 19:
                return '证书过期类-危险品作业许可证到期前30天'
            case 21:
                return '证书过期类-机械设施设备有效到期前30天'
            case 23:
                return '证书过期类-危险品作业人员许可证到期前30天'
            case 25:
                return '证书过期类-储罐低液位预警'
            case 10:
                return '证书过期类-船舶年审合格证过期'
            case 12:
                return '证书过期类-船舶经营许可证过期'
            case 14:
                return '证书过期类-船舶营运许可证过期'
            case 16:
                return '证书过期类-水运企业营运许可证过期'
            case 18:
                return '证书过期类,港口企业营运许可证过期'
        }
    }


    render() {
        const {portDetail} = this.props
        const info = portDetail.data[0] || {}
        let yjlx = ''
        if (info.yjlx == 1) {
            yjlx = '危货作业'
        }
        else if (info.yjlx == 2) {
            yjlx = '流量监控'
        }
        else if (info.yjlx == 3) {
            yjlx = '证书过期'
        }


        let yjjb = ''
        if (info.yjjb == 1) {
            yjjb = '一般'
        }
        else if (info.yjjb == 2) {
            yjlx = '较大'
        }
        else if (info.yjjb == 3) {
            yjjb = '重大'
        }

        else if (info.yjjb == 4) {
            yjjb = '专案'
        }


        const rows = [
            {field: '预警时间', value: millToString(info.yjsj)},
            {field: '预警类型', value: yjlx},
            {field: '预警级别', value: yjjb},
            {field: '预警事项', value: this.getYjsj(info.yjsx)},
            {field: '预警企业', value: info.qymc},
            {field: '预警船舶', value: info.cbmc},
            {field: '预警泊位', value: info.bwmc},
        ]


        const res = []
        rows.forEach((row) => {
            res.push(<td>{row.field}</td>)
            res.push(<td>{row.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 4) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}{res[i + 2]}{res[i + 3]}</tr>)
        }


        return (
            <div className="message">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        {resJsx}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapProps({portDetail}) {
    return {
        portDetail
    }
}
export default connect(mapProps)(AlarmInfo)