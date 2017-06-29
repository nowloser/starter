/**
 * 泊位
 * */
import React, {Component} from 'react'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {
    getBerthList,
    loading,
} from '../../action/map.action'
import {connect} from 'react-redux'

class Berth extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            pageSize: 10
        }
    }
    /**
     * 获取搜索的参数
     * @param  others 其他参数
     * @return 参数
     * */
    getParam(others) {
        const {keyword} = this.props
        return Object.assign({bwmc: keyword}, others)
    }

    componentDidMount() {
        //获取数据
        const {dispatch} = this.props
        dispatch(getBerthList(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    /**
     * 点击事件
     * 调用父组件的方法，设置地图中心，和添加标记
     * @param  index 索引
     * */
    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    /**
     * 处理分页
     * @param  page 页码
     * */
    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getBerthList(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }


    render() {
        const {data} = this.props
        return (
            <div>
                {/*搜素数量*/}
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}个泊位
                    </div>
                </div>

                <div className="res-container">
                    {data.data.map((row, index) => {
                        return (
                            <div key={`channel${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.bwmc}
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        <div>生产类型:{row.sclx}</div>
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        <div>泊位属性:{row.bwsx}</div>
                                    </div>
                                </div>
                            </div>)
                    })
                    }

                </div>

                {/*分页*/}
                <Page total={data.total} className="res-page" pageSize={10}
                      pageChange={this.handPage.bind(this)}/>
            </div>
        )


    }
}

function mapStateToProps({berthList:data}) {
    return {data}
}

export default connect(mapStateToProps)(Berth)