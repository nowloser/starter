/**
 * Created by YYSJ on 16/12/7.
 */
import {combineReducers} from 'redux'
import {
    Data,
    PORT,
    PORT_DETAIL,
    CLEAR_DETAIL,
    COMPANY,
    CLEAR_COMPANY,
    SHIP,
    CLEAR_SHIP,
    BERTH,
    CLEAR_BERTH,
    TAG,
    STEP,
    PERSON,
    COMPLIAN,
    MONITOR,
    CLEAR_MONITOR,
    MACHINE,
    CLEAR_MACHINE,
    EMPLOYEE,
    CLEAR_EMPLOYEE,
    TANK,
    CLEAR_TANK,
    COMPLAIN_COMPANY,
    COMPLAIN_BOAT,
    COMPLAIN_SHIP,
    CLEAR_COMPLAIN_COMPANY,
    CLEAR_COMPLAIN_BOAT,
    CLEAR_COMPLAIN_SHIP,
    SELECT_BASE,
    FLOW,
    LAW_PERSON,
    LAW_INFO,
    YJSX
} from '../../action/alarm.action'

function data(state = [], action) {
    switch (action.type) {
        case Data:
            return action.tableData
        default :
            return state
    }
}

const defaultData = {data: [], total: 0}

function port(state = defaultData, action) {
    switch (action.type) {
        case PORT:
            return action.data
        default :
            return state
    }
}


function portDetail(state = defaultData, action) {
    switch (action.type) {
        case PORT_DETAIL:
            return action.data
        case CLEAR_DETAIL:
            return defaultData
        default :
            return state
    }
}

function company(state = defaultData, action) {
    switch (action.type) {
        case COMPANY:
            return action.data
        case CLEAR_COMPANY:
            return defaultData
        default :
            return state
    }
}

function ship(state = defaultData, action) {
    switch (action.type) {
        case SHIP:
            return action.data
        case CLEAR_SHIP:
            return defaultData
        default :
            return state
    }
}



function berth(state = defaultData, action) {
    switch (action.type) {
        case BERTH:
            return action.data
        case CLEAR_BERTH:
            return defaultData
        default :
            return state
    }
}

function tag(state = 1, action) {
    switch (action.type) {
        case TAG:
            return action.tag
        default :
            return state
    }
}
function step(state = {data:[]}, action) {
    switch (action.type) {
        case STEP:
            return action.data
        default :
            return state
    }
}

function person(state = {data:[]}, action) {
    switch (action.type) {
        case PERSON:
            return action.data
        default :
            return state
    }
}


function complain(state = defaultData, action) {
    switch (action.type) {
        case COMPLIAN:
            return action.data
        default :
            return state
    }
}



function tank(state = defaultData, action) {
    switch (action.type) {
        case TANK:
            return action.data
        case CLEAR_TANK:
            return defaultData
        default :
            return state
    }
}

function employee(state = defaultData, action) {
    switch (action.type) {
        case EMPLOYEE:
            return action.data
        case CLEAR_EMPLOYEE:
            return defaultData
        default :
            return state
    }
}


function monitor(state = defaultData, action) {
    switch (action.type) {
        case MONITOR:
            return action.data
        case CLEAR_MONITOR:
            return defaultData
        default :
            return state
    }
}


function machine(state = defaultData, action) {
    switch (action.type) {
        case MACHINE:
            return action.data
        case CLEAR_MACHINE:
            return defaultData
        default :
            return state
    }
}


function complainCompany(state = defaultData, action) {
    switch (action.type) {
        case COMPLAIN_COMPANY:
            return action.data
        case CLEAR_COMPLAIN_COMPANY:
            return defaultData
        default :
            return state
    }
}


function complainBoat(state = defaultData, action) {
    switch (action.type) {
        case COMPLAIN_BOAT:
            return action.data
        case CLEAR_COMPLAIN_BOAT:
            return defaultData
        default :
            return state
    }
}


function complainShip(state = defaultData, action) {
    switch (action.type) {
        case COMPLAIN_SHIP:
            return action.data
        case CLEAR_COMPLAIN_SHIP:
            return defaultData
        default :
            return state
    }
}


function select(state = {map:{fycb:[],fyqy:[],fybw:[],bjjb:[],bjlx:[]}}, action) {
    switch (action.type) {
        case SELECT_BASE:
            return action.data
        default :
            return state
    }
}



function flow(state = defaultData, action) {
    switch (action.type) {
        case FLOW:
            return action.data
        default :
            return state
    }
}

function lawPerson(state = defaultData, action) {
    switch (action.type) {
        case LAW_PERSON:
            return action.data
        default :
            return state
    }
}


function lawInfo(state = defaultData, action) {
    switch (action.type) {
        case LAW_INFO:
            return action.data
        default :
            return state
    }
}

function yjsx(state = defaultData, action) {
    switch (action.type) {
        case YJSX:
            return action.data
        default :
            return state
    }
}


const reducer = combineReducers({
    data,
    port,
    portDetail,
    company,
    ship,
    berth,
    tag,
    step,
    person,
    complain,
    tank,
    employee,
    monitor,
    machine,
    complainCompany,
    complainBoat,
    complainShip,
    select,
    flow,
    lawPerson,
    lawInfo,
    yjsx
})

export default reducer