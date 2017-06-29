import React, {Component} from 'react'
import {
    addWindow,
    replaceCluster,
    getBerthList,
    BERTH,
    replaceMarker
} from '../../action/map.action'
import BerthDetail from '../manager/BerthDetail'
import {setPos,clearPos} from './common'


export default function showProject(param) {
    const {dispatch, changeCard, openModal} = this.props
    getBerthList(Object.assign(param, {page: 1, pageSize: 100000}))((action) => {
        if (action.type !== BERTH) {
            return
        }
        const markers = []
        const data = action.data
        const icons = [
            '../images/sprites/berth_blue.png',
            '../images/sprites/berth.png',
            '../images/sprites/berth.png_red']

        function getIcon(type) {
            if (0 <= type && type < 0.5) {
                return icons[0]
            }

            if (0.5 <= type && type < 1) {
                return icons[1]
            }

            if (1 <= type) {
                return icons[2]
            }

        }

        data.data.forEach((m, index) => {
            if (!m) {
                return
            }

            //TODO
            m.lon = m.jd
            m.lat = m.wd
            /**/
            markers.push({
                position: [m.lon, m.lat],
                icon: getIcon(+m.kbnlsyqk),
                size: [26, 32],
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
                            {field: '泊位名称', value: base.bwmc},
                            {field: '泊位代码', value: base.bwdm},
                            {field: '泊位属性', value: base.bwsx},
                            {field: '所在水系', value: base.bwszsx},
                            {field: '生产类型', value: base.sclx}
                        ], null,
                        () => {
                            openModal(<BerthDetail key={'berth' + m.bwxx_id} bwxx_id={m.bwxx_id}/>, '泊位详细信息')
                        },
                        false)

                }.bind(this),
                over: (current) => {
                    if (current.isCluster) { //当点击聚散点的时候不弹出信息窗口
                        return
                    }
                    const m = current.info
                    setPos.call(this,m,(<div>
                        <div><span className="over-info">{m.bwmc}</span></div>
                    </div>))
                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}