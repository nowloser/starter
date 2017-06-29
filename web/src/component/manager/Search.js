import React, {Component} from 'react'
import classnames from 'classnames'
import {Tabs, Progress, Page, Table, Icon, Modal, Button} from 'rc-ui'
import * as cusIcons from  '../cusIcons'
const Path = Icon.Path
const icons = Icon.icons
class Search extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: ''
        }
    }

    handSearch() {
        const {search} = this.props
        const keyword = this.refs.keyword.value
        search(keyword)

    }

    handChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    clearSearch = () => {
        this.props.closeSearch()
        this.setState({
            value: ''
        })
    }

    render() {

        const {res, closeSearch, search} = this.props
        return (
            <div className="search-bar">
                <input type="text" className="search-input"
                       placeholder="请输入要查询的信息" ref={'keyword'}
                       value={this.state.value}
                       onChange={this.handChange}/>
                <div className="search-close" style={{opacity: res ? '1' : '0'}}
                     onClick={this.clearSearch}>
                    <Icon>
                        <Path d={icons.close}/>
                    </Icon>
                </div>
                <button className="search-btn" onClick={this.handSearch.bind(this)}>
                    <Icon>
                        <Path d={cusIcons.search}/>
                    </Icon>
                </button>
            </div>
        )


    }
}
export default Search