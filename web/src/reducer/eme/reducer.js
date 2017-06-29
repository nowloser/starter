/**
 * Created by YYSJ on 16/12/7.
 */
import {
    CURRENT, HISTORY, PLAN, TOOL, DETAIL, MATERIAL, ADD_INFO,
    SET_CENTER, RE_MARKER, RE_MATER, RE_LIST, DOC,CIRCLE,TRANS
} from '../../action/eme.action'

const defaultData = {data: [], total: 0}

export function center(state = [120.7, 28.0], action) {
    switch (action.type) {
        case SET_CENTER:
            return action.center
        default:
            return state;
    }
}

const defaultMarkers = {}
export function markers(state = defaultMarkers, action) {
    switch (action.type) {
        case RE_MARKER:
            return Object.assign({}, state, {e: action.marker})
        case RE_MATER:
            return Object.assign({}, state, {mater: action.marker})
        default:
            return state;
    }
}

export function circle(state = {}, action) {
    switch (action.type) {
        case CIRCLE:
            return action.circle
        default:
            return state;
    }
}

export function current(state = defaultData, action) {
    switch (action.type) {
        case CURRENT:
            return action.data
        default :
            return state
    }
}


export function history(state = defaultData, action) {
    switch (action.type) {
        case HISTORY:
            return action.data
        default :
            return state
    }
}


export function plan(state = defaultData, action) {
    switch (action.type) {
        case PLAN:
            return action.data
        default :
            return state
    }
}


export function tool(state = 0, action) {
    switch (action.type) {
        case TOOL:
            return action.tool
        default :
            return state
    }
}


export function detail(state = defaultData, action) {
    switch (action.type) {
        case DETAIL:
            return action.data
        default :
            return state
    }
}

export function material(state = defaultData, action) {
    switch (action.type) {
        case MATERIAL:
            return action.data
        default :
            return state
    }
}


export function addInfo(state = {map: {sjlx: []}}, action) {
    switch (action.type) {
        case ADD_INFO:
            return action.data
        default :
            return state
    }
}

export function reList(state = defaultData, action) {
    switch (action.type) {
        case RE_LIST:
            return action.data
        default :
            return state
    }
}

export function doc(state = {map: {}}, action) {
    switch (action.type) {
        case DOC:
            return action.data
        default :
            return state
    }
}

export function trans(state = defaultData, action) {
    switch (action.type) {
        case TRANS:
            return action.data
        default :
            return state
    }
}
