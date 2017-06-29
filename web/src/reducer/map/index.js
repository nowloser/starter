import * as map from './map'
import * as data from './data'
import * as ui from './ui'
import {combineReducers} from 'redux';

const rootReducer = combineReducers(Object.assign({},map,data,ui));

export default rootReducer

