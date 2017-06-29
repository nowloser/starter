import React, {Component} from 'react'
// import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import * as cusIcons from '../cusIcons'
import {changeTool} from '../../action/eme.action'
import classnames from 'classnames'

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

class Tool extends Component {
    constructor() {
        super();
    }

    _changeTool = (tool) => {
        const {dispatch} = this.props
        dispatch(changeTool(tool))
    }

    render() {
        const {currentTab} = this.props

        const toolClass = classnames({
            'tool-container': true,
            active: currentTab === 0
        })
        return (
            <div className={toolClass}>
                <div className="tool-box" onClick={this._changeTool.bind(this, 1)}>
                    <Icon>
                        <Path d={cusIcons.report}/>
                    </Icon>
                </div>
                <div className="tool-box" onClick={this._changeTool.bind(this, 2)}>
                    <Icon>
                        <Path d={cusIcons.edit}/>
                    </Icon>
                </div>
                <div className="tool-box" onClick={this._changeTool.bind(this, 4)}>
                    <Icon>
                        <Path d={cusIcons.material}/>
                    </Icon>
                </div>
                <div className="tool-box" onClick={this._changeTool.bind(this, 3)}>
                    <Icon>
                        <Path d={cusIcons.file}/>
                    </Icon>
                </div>
            </div>
        )
    }
}

function mapProps({}) {
    return {}
}
export default connect(mapProps)(Tool)
