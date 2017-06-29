import React, {Component} from 'react'
import {
    getCompany,
    addWindow,
    getWaterInfo,
    getWaterBusiness,
    getDangerInfo,
    getDangerBusiness,
    replaceCluster,
    replaceMarker,
    COMPANY,
} from '../../action/map.action'
import openInfoWindow from '../manager/infoWin'
import Water from '../manager/Water'
import Danger from '../manager/Danger'
import {setPos,clearPos} from './common'

export default function showCompany(param) {
    const {dispatch, changeCard, openModal} = this.props
    getCompany(Object.assign(param, {page: 1, pageSize: 100000}))((action) => {
        if (action.type !== COMPANY) {
            return
        }

        const markers = []
        const data = action.data
        const icons = ['../images/blueCompany.png', '../images/blueCompany.png', '../images/redCompany.png', '../images/orangeCompany.png']
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            m.lon = m.jd
            m.lat = m.wd
            /**/
            markers.push({
                position: [m.lon, m.lat],
                icon: icons[m.qylx - 1],
                rotate: 0,
                data: m,
                size: [26, 32],
                event: {
                    click: () => {
                        alert()
                    }
                }
            })
        })

        dispatch(replaceCluster({
            markers,
            event: {
                click: (current, e) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    changeCard(true, [], null, null, true)
                    const m = current.info
                    dispatch(replaceMarker([{
                        position: [m.lon, m.lat],
                        icon: '../images/circle.png',
                        rotate: 0,
                        size: [50, 50]
                    }]))
                    if (m.qylx == 1) {
                        const getDetail = async function () {
                            let base = await getWaterInfo({qymc: m.qymc, ywdwbm: m.ywdwbm})
                            let business = await getWaterBusiness({qybm: m.ywdwbm})
                            base = base.data[0] || {}
                            business = business.data[0] || {}
                            changeCard(true, [
                                {field: '企业名称', value: base.qymc},
                                {field: '许可证号码', value: base.xkzhm},
                                {field: '许可经营范围', value: base.xkjyfw},
                                {field: '许可批文号', value: base.xkpwh},
                                {field: '许可证状态', value: +base.xkzzt === 0 ? '有效' : '失效'},
                                {field: '联系人', value: base.fddbr},
                                {field: '联系电话', value: base.frlxdh},
                            ], [
                                {field: '船舶数据（艘）', value: business.cbsj},
                                {field: '总动力', value: business.zdl && (business.zdl + 'KW')},
                                {field: '海机务人员数', value: business.hjwrys},
                                {field: '最近年审时间', value: business.zjnssj},
                                {field: '最近执法日期', value: business.zjzfrq},
                                {field: '隐患未整改数', value: business.ffwzgs},
                                {field: '处罚数', value: business.cfs},
                            ], () => {
                                openModal(<Water key={'water' + m.qymc} qymc={m.qymc}
                                                 qybm={m.ywdwbm}/>, '企业详细信息')
                            }, false)
                        }

                        getDetail()
                    } else {
                        const getDetail = async function () {
                            let base = await getDangerInfo({qymc: m.qymc, sfwhqy: m.qylx == 3 ? 1 : 0})
                            let business = await getDangerBusiness({qybm: m.ywdwbm})
                            base = base.data[0] || {}
                            business = business.data[0] || {}
                            changeCard(true, [
                                {field: '企业名称', value: base.qymc},
                                {field: '企业经营地址', value: base.qyjydz},
                                {field: '经营许可证编号', value: base.gkjyxkzbh},
                                {field: '是否危货企业', value: +base.sfwhqy === 0 ? '否' : '是'},
                                {field: '危货作业附证编号', value: base.whzyfzbh},
                                {field: '港口经营业务', value: base.gkjyyw},
                                {field: '企业负责人', value: base.qyfzr},
                                {field: '联系电话', value: base.lxdh},
                            ], [
                                {field: '隐患未整改数', value: business.ffwzgs},
                                {field: '泊位数', value: business.bws},
                                {field: '最近年审时间', value: business.zjnssj},
                                {field: '最近执法日期', value: business.zjzfrq},
                                {field: '当前安保等级', value: business.dqabdj},
                                {field: '从业人员数', value: business.dqabdj},
                                {field: '处罚数', value: business.cfs},
                                {field: '机械设备数', value: business.jxsbs},
                            ], () => {
                                openModal(<Danger key={'danger' + m.qymc} qymc={m.qymc}
                                                  qybm={m.ywdwbm}/>, '企业详细信息')
                            }, false)
                        }

                        getDetail()
                    }
                },
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }

                    const m = current.info
                    setPos.call(this,m,(<div>
                        <div>患:<span className="over-info">{m.yhwzg}</span></div>
                        <div>巡:<span className="over-info">{m.rcxc}</span></div>
                    </div>))

                },
                out: () => {
                    clearPos.call(this)
                    // this.setState({
                    //     windowPos: ['-10000px', '-10000px']
                    // })
                }
            }
        }))

    })
}
