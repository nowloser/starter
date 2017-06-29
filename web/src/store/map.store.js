import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducer/map/index';
import thunkMiddleware from 'redux-thunk';
import reduxLog from './reduxLog.js'

function configStore(preloadedState) {
    return createStore(rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware,reduxLog));
}

const store = configStore()

export default store