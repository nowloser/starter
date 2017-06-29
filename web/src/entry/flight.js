import React,{Component} from  'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from '../store/flight.store';
import Flight from '../container/flight';

render((
    <Provider store={store}>
        <Flight></Flight>
    </Provider>
), document.getElementById("content"))