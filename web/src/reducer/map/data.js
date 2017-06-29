/**
 * Created by xiangfahai on 16/7/27.
 */

import {
    LOAD_HEADER,
    COMPANY,
    COMPLETE,
    LOADING,
    BEACON,
    CHANNEL,
    BOAT,
    PROJECT,
    MAINTAIN,
    BUILDING,
    VIDEO,
    ALARM,
    FLOW,
    TRUCK,
    BERTH_INFO,
    PIER_INFO,
    MECHANICAL_INFO,
    EMPLOYEE_INFO,
    WARNING_INFO,
    DANGER_DETAIL,
    WATER_DETAIL,
    COMPANY_BOATS,
    YEAR_VERIFY,
    BOAT_DETAIL,
    WATER_EMPLOYEE,
    FLOW_STAT,
    BERTH,
    BERTH_DETAIL,
    WORK_BERTH
} from '../../action/map.action.js';

const defaultData = {data: [], total: 0}

/*指标*/
export function headerData(state = {}, {type, data}) {
    switch (type) {
        case LOAD_HEADER:
            return data
        default:
            return state;
    }
}

/*企业*/
export function company(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case COMPANY:
            return action.data
        default:
            return state;
    }
}
/*航标*/
export function beacon(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case BEACON:
            return action.data
        default:
            return state;
    }
}

/*航道*/
export function channel(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case CHANNEL:
            return action.data
        default:
            return state;
    }
}


/*船舶*/
export function boat(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case BOAT:
            return action.data
        default:
            return state;
    }
}


/*工程*/
export function project(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case PROJECT:
            return action.data
        default:
            return state;
    }
}

/*航道养护*/
export function maintain(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case MAINTAIN:
            return action.data
        default:
            return state;
    }
}

/*涉航建筑物*/
export function building(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case BUILDING:
            return action.data
        default:
            return state;
    }
}


/*视频*/
export function video(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case VIDEO:
            return action.data
        default:
            return state;
    }
}


/*预警信息*/
export function alarmTotal(state = {}, action) {
    switch (action.type) {
        case ALARM:
            return action.data
        default:
            return state;
    }
}


/*加载状态*/
export function loading(state = true, action) {
    switch (action.type) {
        case LOADING:
            return true
        case COMPLETE:
            return false
        default:
            return state;
    }
}



/*船舶流量*/
export function flow(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case FLOW:
            return action.data
        default:
            return state;
    }
}


/*高速集卡*/
export function truck(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case TRUCK:
            return action.data
        default:
            return state;
    }
}


/*泊位信息*/
export function berth(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case BERTH_INFO:
            return action.data
        default:
            return state;
    }
}


/*码头信息*/
export function pier(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case PIER_INFO:
            return action.data
        default:
            return state;
    }
}

/*机械设备信息*/
export function mechanical(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case MECHANICAL_INFO:
            return action.data
        default:
            return state;
    }
}


/*从业人员信息*/
export function employee(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case EMPLOYEE_INFO:
            return action.data
        default:
            return state;
    }
}


/*从业人员信息*/
export function waterEmployee(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case WATER_EMPLOYEE:
            return action.data
        default:
            return state;
    }
}

/*安全隐患信息*/
export function warning(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case WARNING_INFO:
            return action.data
        default:
            return state;
    }
}


/*获取港口企业详细信息*/
export function dangerDetail(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case DANGER_DETAIL:
            return action.data
        default:
            return state;
    }
}


/*获取水运企业详细信息*/
export function waterDetail(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case WATER_DETAIL:
            return action.data
        default:
            return state;
    }
}


/*船舶详细信息*/
export function boatDetail(state = {data: [{}], total: 0}, action) {
    switch (action.type) {
        case BOAT_DETAIL:
            return action.data
        default:
            return state;
    }
}


/*船舶列表*/
export function companyBoats(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case COMPANY_BOATS:
            return action.data
        default:
            return state;
    }
}


/*年检*/
export function verify(state = {data: [], total: 0}, action) {
    switch (action.type) {
        case YEAR_VERIFY:
            return action.data
        default:
            return state;
    }
}

/*流量统计*/
export function flowStat(state = {map: {cbczsl: [], cbslsx: [], cbslxx: [], cbsj: []}, total: 0}, action) {
    switch (action.type) {
        case FLOW_STAT:
            return action.data
        default:
            return state;
    }
}

/*泊位*/
export function berthList(state = defaultData, action) {
    switch (action.type) {
        case BERTH:
            return action.data
        default:
            return state;
    }
}

/*泊位详细信息*/
export function berthDetail(state = defaultData, action) {
    switch (action.type) {
        case BERTH_DETAIL:
            return action.data
        default:
            return state;
    }
}

/*在线泊位*/
export function workBerth(state = defaultData, action) {
    switch (action.type) {
        case WORK_BERTH:
            return action.data
        default:
            return state;
    }
}


