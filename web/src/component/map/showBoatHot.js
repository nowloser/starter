import React, {Component} from 'react'
import {
    addWindow,
    getMudBoat,
    replaceHot,
    getBoat,
    BOAT,
    getBoatInfo,
} from '../../action/map.action'

export default function showBoatHot(param) {
    const {dispatch} = this.props
    const typeBoat = param.cblx === 4 ? getMudBoat : getBoat
    typeBoat(Object.assign(param,{page: 1, pageSize: 100000}))((action) => {
        if (action.type !== BOAT) {
            return
        }
        const points = []
        const data = action.data
        data.data.forEach((m, index) => {
            if (!m) {
                return
            }
            //TODO
            m.lon = m.jd
            m.lat = m.wd

            points.push({
                lon:m.lon,
                lat:m.lat,
                value:1
            })
        })

        dispatch(replaceHot({
            radius:10,
            points
        }))

    })
}