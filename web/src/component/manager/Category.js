import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {changeSelect} from '../../action/map.action'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import * as cusIcons from '../cusIcons'

const Path = Icon.Path
const icons = Icon.icons

class Category extends Component {
    constructor(props, context) {
        super(props, context)
    }

    changeSel(select) {
        const {dispatch} = this.props
        dispatch(changeSelect(select))
    }

    render() {
        const {show, select} = this.props
        const kinds = [
            {name: '企业', type: 'qy', icon: 'company'},
            {name: '船舶', type: 'cb', icon: 'zycb'},
            {name: '泊位', type: 'gc', icon: 'berth'},
            {name: '航标', type: 'hb', icon: 'beacon'},
            {name: '航道', type: 'hd', icon: 'channel'}
        ]

        const listClass = classnames({
            'search-bar': true,
            'list-bar': true,
            active: show
        })

        return (
            <div className={listClass}>
                {kinds.map((list, index) => {
                    return (
                        <div key={`cate${index}`} className="list-container"
                             onClick={this.changeSel.bind(this, index + 1)}
                             style={{background: (select == index + 1 ) ? '#eee' : '#fff'}}>
                            {list.icon ? <div className="cate-svg-icon">
                                    <Icon>
                                        {cusIcons[list.icon].map ? cusIcons[list.icon].map((icon, i) => <Path
                                                key={`cate${list.icon + i}`}
                                                d={icon}/>) : <Path d={ cusIcons[list.icon]}/>}
                                    </Icon>
                                </div> : <div className={`cate-icon-${list.type}`}></div>}
                            <span>{list.name}</span>
                        </div>
                    )
                })}

                <div className="data-container">
                    {[
                        {name: '视频监控', color: '#ec9062', icon: 'video', type: 'sp'},
                        {name: '船舶流量', color: '#a1c166', icon: 'flow', type: 'll'},
                        {name: '涉航建筑', color: '#36a0d7', icon: 'jzw', type: 'hdyh'},
                        {name: '高速集卡', color: '#48bf99', icon: 'sfz', type: 'sfz'},
                    ].map((list, index) => {
                        return (
                            <div key={`cate-b${index}`} className="list-block"
                                 style={{background: (select == index + 6) ? '#eee' : '#fff'}}
                                 onClick={this.changeSel.bind(this, index + 6)}>
                                {/*<div className={`cate-icon-${list.type}`}></div>*/}

                                {list.icon ? <div className="cate-svg-icon">
                                        <Icon>
                                            {cusIcons[list.icon].map ? cusIcons[list.icon].map((icon, i) => <Path
                                                    key={`cate${list.icon + i}`}
                                                    d={icon}/>) : <Path d={ cusIcons[list.icon]}/>}
                                        </Icon>
                                    </div> : <div className={`cate-icon-${list.type}`}></div>}

                                <span>{list.name}</span>
                            </div>)
                    })}
                </div>

            </div>
        )


    }
}

function storeFormatter({select}) {
    return {select}
}
export default connect(storeFormatter)(Category)