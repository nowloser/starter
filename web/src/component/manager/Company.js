import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {
    getCompany,
    loading,
} from '../../action/map.action'
import {connect} from 'react-redux'
import Kind from './Kind'

const Path = Icon.Path
const icons = Icon.icons
/**
 * 公司列表
 * */
class Company extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            select: 0,//分类
            pageSize: 10,
            current: -1,
            tag: false
        }
    }

    getParam(others) {
        const {keyword} = this.props
        const {select} = this.state

        let param
        switch (select) {
            case 0:
                param = {}
                break
            case 1:
                param = {sfwhqy: 0}
                break
            case 2:
                param = {qylx: 1}
                break
            case 3:
                param = {sfwhqy: 1}
                break
        }
        return Object.assign({qymc: keyword}, param, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getCompany(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getCompany(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }


    handSelect(select) {
        const {dispatch, handType} = this.props
        this.setState({
            select
        }, () => {
            dispatch(loading())
            dispatch(getCompany(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
            handType(Object.assign(this.getParam({}),{qymc:''}))
        })
    }

    componentWillReceiveProps(next) {
        const {data, dispatch} = next
        if (this.props.data === data) {
            return
        }

        this.setState({
            current: -1
        })


    }

    render() {
        const {data} = this.props
        const sel = ['全部', '港口企业', '水运企业', '危货企业']
        return (
            <div className="show">
                <Kind sels={sel} current={this.state.select} row="4" onClick={this.handSelect.bind(this)}/>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}家企业
                    </div>
                </div>
                <div className="res-container">
                    {data.data.map((row, index) => {
                        const iconClass = classnames({
                            "res-icon": true,
                            'active': this.state.current === index

                        })
                        return (
                            <div key={`company${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>

                                <div className="res-box">
                                    <div className="res-title">
                                        <div className={iconClass}>
                                            {index + 1}
                                        </div>
                                        {row.qymc}
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        <div>电话:{row.lxdh}</div>
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        <div>地址:{row.qyjydz}</div>
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

function mapStateToProps({company:data}) {
    return {data}
}

export default connect(mapStateToProps)(Company)