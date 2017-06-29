import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {setCenter, getBuilding, loading, replaceMarker} from '../../action/map.action'
import {connect} from 'react-redux'

const Path = Icon.Path
const icons = Icon.icons

/**
 * 涉航建筑物
 * */
class Building extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            pageSize: 10
        }
    }

    getParam(others) {
        const {keyword} = this.props
        return Object.assign({jzwmc: keyword}, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getBuilding(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }

    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getBuilding(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }

    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }

    render() {
        const {data} = this.props
        return (
            <div>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}个涉航建筑物
                    </div>
                </div>


                <div className="res-container">
                    {data.data.map((row, index) => {
                        return (
                            <div key={`building${index}`} className="res-list"
                                 onClick={this.showMap.bind(this, index)}>
                                <div className="res-box">
                                    <div className="res-title">
                                        <div className="res-icon">
                                            {index + 1}
                                        </div>
                                        {row.jzwmc}

                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        所属航道编号:{row.sshdbm}
                                    </div>
                                    <div className="res-add">
                                        <div className='res-sep'></div>
                                        所属航道名称:{row.sshdmc}
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

function mapStateToProps({building:data}) {
    return {data}
}

export default connect(mapStateToProps)(Building)