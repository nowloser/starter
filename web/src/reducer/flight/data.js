/**
 * Created by xiangfahai on 16/7/27.
 */

import {FLIGHT} from '../../action/flight.action';

const defaultData = {data: [], total: 0}

/*航班信息*/
export function flight(state = defaultData, action) {
    switch (action.type) {
        case FLIGHT:
            return action.data
        default:
            return state;
    }
}


