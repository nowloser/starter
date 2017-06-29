import React, {Component} from 'react'
import {
    addWindow,
    replaceCluster,
    getFlow,
    replaceMarker,
    FLOW,
    getFlowStat
} from '../../action/map.action'
import {setPos, clearPos} from './common'

export default function showFlow(param) {
    const {dispatch, changeCard, changeChart} = this.props
    getFlow({page: 1, pageSize: 100000})((action) => {
        if (action.type !== FLOW) {
            return
        }
        const markers = []
        const data = action.data
        const icons = '../images/sprites/ll.png'
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            m.lon = m.jd
            m.lat = m.wd
            /**/
            markers.push({
                position: [m.lon, m.lat],
                icon: icons,
                size: [26, 32],
                data: m,
                style: {
                    label: `上行流量:${m.sxll}\n下行流量:${m.xxll}\n总流量:${m.zll}`,
                    fontOpacity: ".8",
                    fontColor:"#333",
                    backgroundGraphic: '../images/sprites/white.png',
                    backgroundWidth: 120,
                    backgroundHeight: 70,
                    backgroundXOffset: -60,
                    labelXOffset: 0,
                    backgroundYOffset: -70,
                    labelYOffset: 35
                }
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
                    dispatch(getFlowStat({
                        gczid: m.llgcz_id
                    }))

                    changeChart(true)
                }.bind(this),
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this, m, (<div>观测站名称:<span className="over-info">{m.gczmc}</span></div>))
                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}