import React, {Component} from 'react'
import {
    replaceCluster,
    getBoat,
    BOAT,
    getBoatInfo,
    replaceMarker,
    replacePolyline,
    setCenter,
    addTrail,
    addSign
} from '../../action/map.action'
import {getHisTrans} from '../../action/map.action'
import BoatInfo from '../manager/BoatInfo'
import {setPos, clearPos} from './common'

export default function showBoat(param) {
    const {dispatch, changeCard, openModal} = this.props
    const handSearch = (param, info) => {
        const {dispatch} = this.props
        this.clearTrail();
        (async() => {
            const data = await getHisTrans(Object.assign({}, param, {page: 1, pageSize: 1000}))
            if (!data.data.length) {
                return Promise.reject('轨迹为空')
            }
            const jwd = data.data.map(m => {
                return [m.jd, m.wd]
            })
            const polyline = {
                path: jwd,
                strokeColor: "#f00",
                strokeOpacity: .5,
                strokeWidth: 2,

            }
            dispatch(replaceCluster(null))
            this.boatInterval && clearInterval(this.boatInterval)
            dispatch(setCenter(jwd[0]))
            dispatch(replacePolyline([polyline]))
            const markers = []
            for (let i = 0; i < jwd.length; i++) {
                if (i && i !== jwd.length - 1) {
                    if (Math.abs(jwd[i][0] - jwd[i - 1][0]) < 0.001 && Math.abs(jwd[i][1] - jwd[i - 1][1]) < 0.001) {
                        continue
                    }
                }

                markers.push({
                    position: jwd[i],
                    event: {
                        click: () => {
                            alert(1)
                        }
                    },
                    style: {
                        fill: true,
                        // fillOpacity: 0.4,
                        fillColor: "red",
                        strokeColor: "yellow",
                        pointRadius: 3,
                        label: data.data[i].cwgxsj,
                        fontColor: "#0000ff",
                        fontOpacity: "0.5",
                        fontFamily: "隶书",
                        fontSize: "8em",
                        fontWeight: "bold",
                        labelSelect: "true",
                        backgroundGraphic: '../images/sprites/white.png',
                        backgroundWidth: 150,
                        backgroundHeight: 25,
                        backgroundXOffset: 5,
                        labelXOffset: 80
                    }
                })


            }
            let i = 0
            dispatch(addTrail(markers))
            this.ani = setInterval(() => {
                if (i >= data.data.length) {
                    clearInterval(this.ani)
                    return
                }
                dispatch(addSign([{
                    position: [data.data[i].jd, data.data[i].wd],
                    icon: info.icon,
                    size: [22, 11],
                    rotate: data.data[i].hx % 360 - 90,
                }]))
                i++
            }, 500)
        })().catch((data) => {
            alert(data)
        })
    }

    getBoat(Object.assign(param, {page: 1, pageSize: 100000}))((action) => {
        if (action.type !== BOAT) {
            return
        }
        const markers = []
        const data = action.data
        const icons = ['../images/boat/custom.png',
            '../images/boat/other.png',
            '../images/boat/good.png',
            '../images/boat/high.png',
            '../images/boat/save.png',
            '../images/boat/tuo.png',
            '../images/boat/ying.png',
            '../images/boat/you.png',
            '../images/boat/law.png'
        ]

        const runIcons = ['../images/boat/rcustom.png',
            '../images/boat/rother.png',
            '../images/boat/rgood.png',
            '../images/boat/rhigh.png',
            '../images/boat/rsave.png',
            '../images/boat/rtuo.png',
            '../images/boat/rying.png',
            '../images/boat/ryou.png',
            '../images/boat/rlaw.png'
        ]

        const transIcons = ['../images/boat/zcustom.png',
            '../images/boat/zother.png',
            '../images/boat/zgood.png',
            '../images/boat/zhigh.png',
            '../images/boat/zsave.png',
            '../images/boat/ztuo.png',
            '../images/boat/zying.png',
            '../images/boat/zyou.png',
            '../images/boat/zlaw.png'
        ]


        const stopIcons = ['../images/boat/bcustom.png',
            '../images/boat/bother.png',
            '../images/boat/bgood.png',
            '../images/boat/bhigh.png',
            '../images/boat/bsave.png',
            '../images/boat/btuo.png',
            '../images/boat/bying.png',
            '../images/boat/byou.png',
            '../images/boat/blaw.png'
        ]
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            m.lon = m.jd
            m.lat = m.wd
            m.cblx = m.cblx || ''
            if (m.cblx.indexOf('客船') !== -1) {
                m.lx = 0
            }
            else if (m.cblx.indexOf('货船') !== -1) {
                m.lx = 2
            }

            else if (m.cblx.indexOf('高速') !== -1) {
                m.lx = 3
            }

            else if (m.cblx.indexOf('搜救') !== -1) {
                m.lx = 4
            }

            else if (m.cblx.indexOf('拖') !== -1) {
                m.lx = 5
            }

            else if (m.cblx.indexOf('引航') !== -1) {
                m.lx = 6
            }
            else if (m.cblx.indexOf('游轮') !== -1) {
                m.lx = 7
            }

            else if (m.cblx.indexOf('执法') !== -1) {
                m.lx = 8
            }
            else {
                m.lx = 1
            }

            m.cbhxzt = m.cbhxzt || ''
            let icon = ''
            if (m.cbhxzt.indexOf('在航') !== -1) {
                icon = runIcons[m.lx]
            } else if (m.cbhxzt.indexOf('系泊') !== -1 || m.cbhxzt.indexOf('停靠') !== -1) {
                icon = stopIcons[m.lx]
            } else {
                icon = icons[m.lx]
            }
            m.icon = icon
            markers.push({
                position: [m.lon, m.lat],
                icon,
                rotate: m.hx % 360 - 90,
                size: [22, 11],
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
                    changeCard(true, [], null, null, true)
                    console.log(m)
                    const getDetail = async() => {
                        // const param = {}

                        let param = {}
                        if (m.flag == 4) {
                            param = {flag: m.flag, cb_id: m.cb_id}
                        } else {
                            param = {cbdjh: m.mmsi, flag: m.flag}
                        }
                        let base = await getBoatInfo(param)
                        base = base.data[0] || {}
                        const rows = [
                            {field: '船舶名称', value: base.cbmc},
                            {field: '经度', value: base.jd},
                            {field: 'MMSI', value: base.mmsi},
                            {field: '纬度', value: base.wd},
                            {field: 'IMO号', value: base.imo},
                            {field: '速度', value: base.sd && base.sd + '节'},
                            {field: '航向', value: base.hx},
                            {field: '类型', value: base.cblx},
                            {field: '船首向', value: base.csx && base.csx + '度'},
                            {field: '状态', value: base.cbhxzt},
                            {field: '长度', value: base.cbcd && base.cbcd + '米'},
                            {field: '更新时间', value: base.cwgxsj},
                            {field: '宽度', value: base.cbkd && base.cbkd + '米'},
                            {field: '吃水', value: base.cbcs && base.cbcs + '米'}
                        ]
                        if (m.flag == 1) {
                            changeCard(true, rows, null, () => {
                                    openModal(<BoatInfo mmsi={m.mmsi} cb_id={m.cb_id}/>, '船舶详细信息')
                                }, false, (param) => {
                                    handSearch(Object.assign(param, {mmsi: base.mmsi}), m)
                                }, () => {
                                    this.clearTrail()
                                    this.showPos(this.props)
                                }
                            )
                        } else {
                            changeCard(true, rows, null, null, false, (param) => {
                                    handSearch(Object.assign(param, {mmsi: base.mmsi}), m)
                                }, () => {
                                    this.clearTrail()
                                    this.showPos(this.props)
                                }
                            )
                        }

                    }

                    getDetail()
                    // m.mmsi ? getDetail() : changeCard(true, [
                    //             {field: '船舶名称', value: m.cbmc},
                    //             {field: '经度', value: m.jd},
                    //             {field: 'MMSI', value: m.mmsi},
                    //             {field: '纬度', value: m.wd},
                    //             {field: 'IMO号', value: m.imo},
                    //             {field: '速度', value: m.sd && m.sd + '节'},
                    //             {field: '航向', value: m.hx},
                    //             {field: '类型', value: m.cblx},
                    //             {field: '船首向', value: m.csx && m.csx + '度'},
                    //             {field: '状态', value: m.cbhxzt},
                    //             {field: '长度', value: m.cbcd && m.cbcd + '米'},
                    //             {field: '更新时间', value: m.cwgxsj},
                    //             {field: '宽度', value: m.cbkd && m.cbkd + '米'},
                    //             {field: '吃水', value: m.cbcs && m.cbcs + '米'}
                    //         ], null,
                    //         null,
                    //         false)
                }.bind(this),
                over: (current) => {
                    if (current.info.cblx.indexOf('客船') === -1) {
                        return
                    }
                    const m = current.info
                    setPos.call(this, m, (<div>乘客:{this.state.detail.ffwzgs}</div>))
                },
                out: () => {
                    clearPos.call(this)
                }
            }
        }))

    })
}