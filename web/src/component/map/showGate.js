import React, {Component} from 'react'
import {
    addWindow,
    replaceCluster,
    getTruck,
    TRUCK,
    replaceMarker
} from '../../action/map.action'
import {setPos,clearPos} from './common'

export default function showGate(param) {
    const {dispatch} = this.props
    getTruck({page: 1, pageSize: 100000})((action) => {
        if (action.type !== TRUCK) {
            return
        }
        const markers = []
        const data = action.data
        const icons = '../images/sprites/sfz.png'
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            //TODO
            // m.lon = 120.7 + Math.random() - .5
            // m.lat = 28 + Math.random() - .5

            m.lon = m.jd
            m.lat = m.wd
            /**/
            markers.push({
                position: [m.lon, m.lat],
                icon: icons,
                size:[26,32],
                data: m,
            })
        })

        dispatch(replaceCluster({
            markers,
            event: {
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this, m, (<div>
                        <div>{m.sfzmc}</div>
                        <div>高速:{m.gsmc}</div>
                        <div>车流量:{m.cll}</div>
                    </div>))
                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}