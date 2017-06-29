import * as data from './data'
import {combineReducers} from 'redux';

const rootReducer = combineReducers(Object.assign({},data));

export default rootReducer

