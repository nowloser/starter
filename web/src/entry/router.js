import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link ,IndexRoute} from 'react-router'
import Nav from '../component/NavRouter'
import Map from './map'
import Alarm from './alarm'
import Eme from './emergency'


render((
    <Router>
        <Route path="/" component={Nav}>
            <IndexRoute component={Map} />
            <Route path="map" component={Map} />
            <Route path="alarm" component={Alarm}/>
            <Route path="eme" component={Eme}/>
        </Route>
    </Router>
), document.getElementById("content"))