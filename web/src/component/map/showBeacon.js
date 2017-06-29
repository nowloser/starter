import React, {Component} from 'react'
import {
    replaceCluster,
    getBeacon,
    replaceMarker,
    BEACON
} from '../../action/map.action'
import {setPos,clearPos} from './common'

export default function showBeacon() {
    const {dispatch,changeCard} = this.props
    getBeacon({page: 1, pageSize: 100000})((action) => {
        if (action.type !== BEACON) {
            return
        }
        const markers = []
        const data = action.data
        const icons = '../images/sprites/hb.png'
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            //TODO
            m.lon = m.sbddjd
            m.lat = m.sbddwd
            // m.lx = 1 & index
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
                click: function (current) {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    dispatch(replaceMarker([{
                        position: [m.lon, m.lat],
                        icon: '../images/circle.png',
                        rotate: 0,
                        size: [50, 50]
                    }]))
                    let base = m
                    changeCard(true, [
                            {field: '所属海区名称', value: base.hqhbsshqmc},
                            {field: '编号', value: base.hbbh},
                            {field: '航标管理单位名称', value: base.hbgldwmc},
                            {field: '灯质', value: base.bddz},
                            {field: '构造', value: base.hbgz},
                            {field: '射程', value: base.hbbddgsc}
                        ], null,
                        null,
                        false)
                }.bind(this),
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this,m,(<div>
                        <div>编号:<span className="over-info">{m.hbbh}</span></div>
                    </div>))


                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}