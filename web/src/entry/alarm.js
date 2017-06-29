/**
 * Created by YYSJ on 16/11/23.
 */
import React,{Component} from 'react'
import {Provider} from 'react-redux'
import store from '../store/alarm.store'
import {render} from 'react-dom'
import App from '../container/alarm'

// render(
//     <Provider store={store}>
//         <App/>
//     </Provider> ,document.getElementById('content')
// )


class Alarm extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default Alarm