import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {setCenter, getTruck, loading, replaceMarker} from '../../action/map.action'
import {connect} from 'react-redux'

const Path = Icon.Path
const icons = Icon.icons

/**
 * 高速集卡
 * */
class Gate extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            pageSize: 10
        }
    }

    getParam(others) {
        const {keyword} = this.props
        return Object.assign({gsmc: keyword}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getTruck(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getTruck(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }


    render() {
        const {data} = this.props
        return (
            <div>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}辆集卡
                    </div>
                </div>

                <div className="res-container">
                    {data.data.map((row, index) => {
                        if (!row) {
                            return
                        }
                        return (
                            <div key={`beacon${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.sfzmc}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        高速:{row.gsmc}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        车流量:{row.cll}
                                    </div>
                                </div>
                            </div>)
                    })
                    }

                </div>

                <Page total={data.total} className="res-page" pageSize={10}
                      pageChange={this.handPage.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps({truck:data}) {
    return {data}
}

export default connect(mapStateToProps)(Gate)