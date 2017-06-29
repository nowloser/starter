import React,{Component} from  'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from '../store/map.store';
import Chat from '../container/boat';

render((
    <Provider store={store}>
        <Chat></Chat>
    </Provider>
), document.getElementById("content"))