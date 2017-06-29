import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Spin} from 'rc-ui'
import {
    setCenter,
    loading,
    getBoat,
    getBoatPos,
    changeLayer,
    replaceMarker,
    getMudBoat
} from '../../action/map.action'
import {connect} from 'react-redux'
import Kind from '../manager/Kind'
/**
 * 船舶
 * */

const Path = Icon.Path
const icons = Icon.icons
class Boat extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            pageSize: 10,
            windowPos: [],
            detail: {}
        }
    }

    getParam(others) {
        const {keyword, param} = this.props
        //TODO 船舶类型
        return Object.assign({cbmc: keyword}, param, others)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getBoatPos(this.getParam.call(this, {page: 1, pageSize: this.state.pageSize})))
        dispatch(loading())
    }


    showMap(index) {
        const {data} = this.props
        this.props.showMap({jd: data.data[index].jd, wd: data.data[index].wd})
    }


    handPage(page) {
        const {dispatch} = this.props
        dispatch(loading())
        dispatch(getBoatPos(this.getParam.call(this, {page, pageSize: this.state.pageSize})))
    }

    componentWillReceiveProps(next) {
        const {data, dispatch} = next
        if (this.props.data === data) {
            return
        }
    }

    toggleLayer(e) {
        const {dispatch} = this.props
        if (e.target.checked) {
            // this.props.changeLayer('hot')
            dispatch(changeLayer('hot'))
        } else {
            // this.props.changeLayer('cluster')
            dispatch(changeLayer('cluster'))

        }

    }

    render() {
        const {data, layer} = this.props
        const sel = ['全部', '客船', '货船', '危险品船', '泥浆船', '本籍船']
        return (
            <div>
                <div className="res-mess">
                    <div className="res-total">
                        共搜索到{data.total}艘船舶
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
                                        {row.cbmc}
                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        <div>MMSI:{row.mmsi}</div>

                                    </div>
                                    <div className="res-info">
                                        <div className='res-sep'></div>
                                        <div>类型:{row.cblx}</div>

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

function mapStateToProps({boat:data, layer}) {
    return {data, layer}
}

export default connect(mapStateToProps)(Boat)