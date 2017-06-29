/**
 * Created by xiangfahai on 16/7/27.
 */

import { combineReducers } from 'redux';

import {CHECK_PERSON,CHECK_ALL_PERSON} from '../action/action.jsx';


function person(state = [{
    name: '王鹿',
    number: 15658089901,
    checked: false
}, {
    name: '张潮',
    number: 12334534,
    checked: false
}, {
    name: '李卫',
    number: 12334511,
    checked: false
}], action) {
    switch (action.type) {
        case CHECK_PERSON:
            const index = action.index
            return [...state.slice(0, index), Object.assign({}, state[index], {checked: action.checked}), ...state.slice(index + 1)]
        case CHECK_ALL_PERSON:

            return  state.map(function(person){
                return Object.assign({},person,{checked: action.checked})
            })
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    person
});

export default rootReducer