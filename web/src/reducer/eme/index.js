import * as data from './reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers(Object.assign({}, data));

export default rootReducer

