import React, {Component} from 'react'
import {
    addWindow,
    replaceCluster,
    BUILDING,
    getBuilding,
    replaceMarker
} from '../../action/map.action'
import BuildingDetail from '../manager/BuildingDetail'
import {setPos,clearPos} from './common'

export default function showBuild() {
    const {dispatch, changeCard,openModal} = this.props
    getBuilding({page: 1, pageSize: 100000})((action) => {
        if (action.type !== BUILDING) {
            return
        }
        const markers = []
        const data = action.data

        const icons = ['../images/sprites/gan.png','../images/sprites/build.png']
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            m.lon = m.jd
            m.lat = m.wd
            /**/
            const lx = m.flag-1
            markers.push({
                position: [m.lon, m.lat],
                icon: icons[lx],
                size:[26,32],
                data: m,
            })
        })

        dispatch(replaceCluster({
            markers,
            event: {
                click: function (current) {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    let base = m
                    dispatch(replaceMarker([{
                        position: [m.lon, m.lat],
                        icon: '../images/circle.png',
                        rotate: 0,
                        size: [50, 50]
                    }]))
                    changeCard(true, [
                            {field: '建筑物名称', value: base.jzwmc},
                            {field: '所属航道编号', value: base.sshdbm},
                            {field: '所属航道名称', value: base.sshdmc},
                            {field: '所在航段起', value: base.szhdq},
                            {field: '所在航段终', value: base.szhdz},
                            {field: '所在行政区', value: base.szxzq},
                            {field: '管理单位名', value: base.gldwm},
                            {field: '距航道起点', value: base.jhdqd},
                            {field: '是否达标', value: base.sfdb},
                            {field: '建筑物种类', value: base.jzwzl},
                            {field: '建筑物净高', value: base.jzwjg},
                            {field: '是否仅在分', value: base.sfjzf},
                            {field: '设计最高通', value: base.sjzgt},
                            {field: '结构型式', value: base.jgxs},
                            {field: '用途分类', value: base.ytfl},
                            {field: '设立通航标', value: base.slthb}
                        ], null,
                        () => {
                            openModal(<BuildingDetail key={'building' + m.jzwmc} info={m}/>, '涉航建筑物详细信息',null,null,'80rem')
                        },
                        false)
                }.bind(this),
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this, m, (<div>建筑物名称:{m.jzwmc}</div>))

                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}
