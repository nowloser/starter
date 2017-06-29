/**
 * Created by YYSJ on 16/12/7.
 */
// import {createStore,applyMiddleware} from 'redux'
// import reducer from '../reducer/alarm/reducer'
// import thunk from 'redux-thunk'
//
// export default createStore(reducer, applyMiddleware(thunk))
//


import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducer/alarm/reducer';
import thunkMiddleware from 'redux-thunk';
import reduxLog from './reduxLog.js'

function configStore(preloadedState) {
    return createStore(rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware,reduxLog));
}

const store = configStore()

export default store