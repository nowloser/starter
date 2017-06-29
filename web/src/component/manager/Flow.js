import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {
    setCenter,
    getFlow,
    loading,
    addWindow,
    replaceMarker
} from '../../action/map.action'
import {connect} from 'react-redux'

const Path = Icon.Path
const icons = Icon.icons

/**
 * 船舶流量
 * */
class Flow extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            select: 0,//分类
            pageSize: 10
        }
    }

    getParam(others) {
        const {keyword} = this.props
        return Object.assign({gczmc : keyword}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getFlow(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
        dispatch(addWindow(null))
    }


    openModal() {
        this.props.openModal()
    }


    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getFlow(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }


    render() {
        const {data} = this.props
        return (
            <div>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}个监控点
                    </div>
                </div>

                <div className="res-container">
                    {data.data.map((row, index) => {
                        return (
                            <div key={`company${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.gczmc}
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        总流量:{row.zll}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        上行流量:{row.sxll}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        下行流量:{row.xxll}
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

function mapStateToProps({flow:data}) {
    return {data}
}

export default connect(mapStateToProps)(Flow)