/**
 * Created by xiangfahai on 16/7/27.
 */

import {combineReducers} from 'redux';

import {SET_CENTER, ADD_MARKER} from '../action/map.action.jsx';


function center(state = [120.7, 28.0], action) {
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
    // },
    // {
    //     position: [120.7, 28.1],
    //     icon: '../images/orangeCompany.png'
    // },
    // {
    //     position: [120.7, 28.2],
    //     icon: '../images/orangeCompany.png'
    // }
]
function markers(state = defaultMarkers, action) {
    switch (action.type) {
        case ADD_MARKER:
            return [...state, action.marker]
        default:
            return state;
    }
}

const defaultWindow = {
    position:[120.7, 28.0],
    content:'sdjksdn',
    // ...
}
function infoWindow(state = null, action) {
    switch (action.type) {
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    center,
    markers,
    infoWindow
});

export default rootReducer