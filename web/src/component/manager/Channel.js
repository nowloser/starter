import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {setCenter, getChannel, loading,addPloyline,replacePolyline} from '../../action/map.action'
import {connect} from 'react-redux'
import Kind from './Kind'

const Path = Icon.Path
const icons = Icon.icons

/**
 * 航道
 * */
class Channel extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            select: 0,//分类
            pageSize: 10
        }
    }


    getParam(others) {
        const {keyword} = this.props
        const {select} = this.state

        let param
        //TODO 类型
        switch (select) {
            case 0:
                param = {hdwhlb:''}
                break
            case 1:
                param = {hdwhlb: 1}
                break
            case 2:
                param = {hdwhlb: 2}
                break
            case 3:
                param = {hdwhlb: 3}
                break
        }
        return Object.assign({hdmc: keyword}, param, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getChannel(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getChannel(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }

    handSelect(select) {
        const {dispatch,handType} = this.props
        this.setState({
            select
        }, () => {
            dispatch(loading())
            dispatch(getChannel(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
            handType(Object.assign(this.getParam({}),{hdmc:''}))
        })
    }

    render() {
        const {data} = this.props
        const sel = ['全部', '一级航道', '二级航道', '三级航道']
        return (
            <div>
                <Kind sels={sel}  current={this.state.select} row="4" onClick={this.handSelect.bind(this)}/>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}条航道
                    </div>
                </div>

                <div className="res-container">
                    {data.data.map((row, index) => {
                        return (
                            <div key={`channel${index}`} className="res-list">
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.hdmc}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        上游:{row.qd}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        下游:{row.zd}
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

function mapStateToProps({channel:data}) {
    return {data}
}

export default connect(mapStateToProps)(Channel)