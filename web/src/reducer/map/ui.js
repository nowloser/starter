/**
 * Created by xiangfahai on 16/7/27.
 */

import {
    SELECT,
    STAT,
    LAYER
} from '../../action/map.action.js';

/*企业*/
export function select(state = 1, action) {
    switch (action.type) {
        case SELECT:
            return action.select
        default:
            return state;
    }
}

export function layer(state = 'cluster', action) {
    switch (action.type) {
        case LAYER:
            return action.layer
        default:
            return state;
    }
}

export function stat(state = true, action) {
    switch (action.type) {
        case STAT:
            return action.stat
        default:
            return state;
    }
}