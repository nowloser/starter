import React, {Component} from 'react'
import {
    addWindow,
    replaceCluster,
    getVideos,
    VIDEO
} from '../../action/map.action'
import VideoOcx from '../manager/videoOcx'
import {setPos,clearPos} from './common'

export default function showVideo(param) {
    const {dispatch} = this.props
    getVideos(Object.assign(param, {page: 1, pageSize: 100000}))((action) => {
        if (action.type !== VIDEO) {
            return
        }
        const markers = []
        const data = action.data
        const icons = '../images/sprites/sp.png'
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
                    this.props.openModal(<VideoOcx data={m}/>, '视频', 'video', '')
                }.bind(this),
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this, m, (<div>
                        <div>设备名称:{m.sbmc}</div>
                        <div>通道:{m.tdmc}</div>
                        <div>所在组:{m.sszmc}</div>
                    </div>))

                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}