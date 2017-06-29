import React, {Component} from 'react'

import {
    addWindow,
    getChannel,
    CHANNEL,
    replacePolyline,
    changeColor
} from '../../action/map.action'

export default function showChannel(param) {
    const {dispatch, changeCard} = this.props
    getChannel(Object.assign(param, {hdmc: '', hdwhlb: '', page: 1, pageSize: 10000}))((action) => {
        if (action.type !== CHANNEL) {
            return
        }
        const data = action.data
        const polyline = data.data.map((m, index) => {
            let jwd = m.jwd.split(';')
            let path = [];
            for (let i = 0; i < jwd.length; i++) {
                const jw = jwd[i]
                if (jw) {
                    const p = jw.split(',')
                    if (p && p[0] && p[1]) {
                        if (i > 0) {
                            if (!path[0] || (Math.abs(path[path.length - 1][0] - p[0]) < 0.01 && Math.abs(path[path.length - 1][1] - p[1]) < 0.01)) {
                                path.push(p)
                            } else {
                                path.pop()
                            }
                        } else {
                            path.push(p)
                        }
                    }
                }
            }
            m.index = index
            const strokeColor = "#98b7e0"
            return {
                path,
                strokeColor,
                strokeOpacity: 1,
                strokeWidth: 5,
                data: m,
                event: {
                    click: (current) => {
                        const m = current.info
                        dispatch(changeColor({
                            color: '#f00',
                            index: m.index,
                            defaultColor: strokeColor
                        }))
                        let base = m
                        changeCard(true, [
                                {field: '航道编码', value: base.hdbm},
                                {field: '航道名称', value: base.hdmc},
                                {field: '起点', value: base.qd},
                                {field: '终点', value: base.zd},
                                {field: '航道长度', value: base.hdcd}
                            ], null,
                            null,
                            false)
                    },
                    over: (current, e) => {
                        const m = current.info
                        this.setState({
                            windowPos: [
                                e.screenX + 'px',
                                e.screenY - 112 + 'px',
                            ],
                            content: (<div>
                                <div>{m.hdmc}</div>
                                <div>航道编码:{m.hdbm}</div>
                            </div>)
                        })


                    },
                    out: () => {
                        this.setState({
                            windowPos: ['-10000px', '-10000px']
                        })
                    }
                }
            }
        })
        dispatch(replacePolyline(polyline))
    })
}