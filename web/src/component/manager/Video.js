import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {
    setCenter,
    loading,
    addWindow,
    replaceMarker,
    getVideos
} from '../../action/map.action'
import {connect} from 'react-redux'
import Kind from './Kind'
import OcxMixin from "./ocxMixin.js"

const Path = Icon.Path
const icons = Icon.icons
/**
 * 视频监控
 * */
class Video extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            select: 0,//分类
            pageSize: 10
        }
        this.WebOcx = null;
    }

    getParam(others) {
        const {keyword} = this.props
        const {select} = this.state

        let param = {}
        //TODO 类型
        // switch (select) {
        //     case 0:
        //         param = {}
        //         break
        //     case 1:
        //         param = {qblx: 1}
        //         break
        //     case 2:
        //         param = {qblx: 1}
        //         break
        //     case 3:
        //         param = {qblx: 2}
        //         break
        // }
        return Object.assign({sbmc: keyword}, param, others)
    }


    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getVideos(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getVideos(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }

    handSelect(select) {
        const {dispatch, handType} = this.props
        this.setState({
            select
        }, () => {
            dispatch(getVideos(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
            handType(this.getParam({}))

        })
    }

    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    render() {
        const {data} = this.props
        const sel = ['全部', '港口监控', '企业监控', '其他']
        return (
            <div>
                {/*<Kind sels={sel} row="4" onClick={this.handSelect.bind(this)}/>*/}
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}个监控
                    </div>
                </div>
                <div className="res-container">
                    {data.data.map((row, index) => {
                        return (
                            <div key={`boat${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.sbmc}
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        所在域:{row.sbszqybh}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        所在组:{row.sszmc}
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

function mapStateToProps({video:data}) {
    return {data}
}

export default connect(mapStateToProps)(Video)