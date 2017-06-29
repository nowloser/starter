/**
 * Created by xiangfahai on 16/7/27.
 */

import {
    SET_CENTER, ADD_MARKER, ADD_WINDOW, RE_MARKER, ADD_POLYLINE, RE_POLYLINE, RE_CLUSTER, RE_HOT,
    CHANGE_COLOR, TRAIL_SIGN, TRAIL_MARKER
} from '../../action/map.action.js';


export function center(state = [120.7, 28.0], action) {
    switch (action.type) {
        case SET_CENTER:
            return action.center
        default:
            return state;
    }
}

const defaultMarkers = [
    // {
    //     position: [120.7, 28.0],
    //     icon: '../images/orangeCompany.png',
    //     event: {
    //         click: function () {
    //             alert()
    //         }
    //     }
    // }
]
export function markers(state = defaultMarkers, action) {
    switch (action.type) {
        case ADD_MARKER:
            return [...state, action.marker]
        case RE_MARKER:
            return action.markers
        case TRAIL_MARKER:
            return Array.isArray(state) ? {trail: action.marker} : Object.assign({}, state, {trail: action.marker})
        case TRAIL_SIGN:
            return Array.isArray(state) ? {sign: action.marker} : Object.assign({}, state, {sign: action.marker})
        default:
            return state;
    }
}

export const defaultWindow = {
    position: [120.7, 28.0],
    content: 'sdjksdn',
    // ...
}
export function infoWindow(state = null, action) {
    switch (action.type) {
        case ADD_WINDOW:
            return action.window
        default:
            return state;
    }
}


export function polyline(state = [], action) {
    switch (action.type) {
        case ADD_POLYLINE:
            return [...state, action.polyline]
        case RE_POLYLINE:
            return action.polyline
        case CHANGE_COLOR:
            console.time('color')
            const polylines = state.map((p, i) => {
                if (p.strokeColor != action.color.defaultColor) {
                    return Object.assign({}, p, {strokeColor: action.color.defaultColor})
                }
                return p
            })
            const index = action.color.index
            console.log(index)
            const strokeColor = action.color.color
            const map = [...polylines.slice(0, index), Object.assign({}, polylines[index], {strokeColor}), ...polylines.slice(index + 1)]
            console.timeEnd('color')

            return map
        default:
            return state;
    }
}

export function cluster(state = null, action) {
    switch (action.type) {
        case RE_CLUSTER:
            return action.cluster
        default:
            return state;
    }
}


export function hot(state = null, action) {
    switch (action.type) {
        case RE_HOT:
            return action.hot
        default:
            return state;
    }
}

