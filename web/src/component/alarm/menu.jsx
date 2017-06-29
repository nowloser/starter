import React, {Component} from 'react'
import '../../../css/menu.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin, Progress} from 'rc-ui'
import * as cusIcons from '../cusIcons'
const Path = Icon.Path

class Menu extends Component {
    open(index) {
        this.props.onClick(index)
    }

    render() {

        return (
            <div className="menu">
                <div className="shu-box">
                    <Icon>
                        <Path d={cusIcons.horline}/>
                    </Icon>
                </div>
                {[
                    {text: '港航自动监控'},
                    {text: '12328投诉监控'}
                ].map((val, index) => {
                    return (
                        <div key={'menu' + index}
                             className={'list ' + (index === this.props.currentIndex ? 'active' : '')}
                             onClick={this.open.bind(this, index)}>
                            <div className="icon-box">
                                <Icon>
                                    {Array.isArray(cusIcons.camerca) ? (cusIcons.bj.map((icon, i) => <Path
                                            d={icon} key={`bj${i}`}/>)) :
                                        <Path d={cusIcons.camerca}/>}
                                </Icon>
                            </div>
                            <span>{val.text}</span>
                        </div>
                    )
                })}

            </div>
        )
    }
}
export default Menu