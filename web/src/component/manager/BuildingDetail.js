import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {
    getWaterBasic,
    getCompanyBoats,
    getEmployee,
    getWarning
} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
/**
 * 船舶
 * */
const Path = Icon.Path
const icons = Icon.icons
class BuildingDetail extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            img: ''
        }
    }

    render() {
        const {info:base} = this.props
        const rows = [
            {field: '建筑物名称', value: base.jzwmc},
            {field: '所属航道编号', value: base.sshdbm},
            {field: '所属航道名称', value: base.sshdmc},
            {field: '所在航段起', value: base.szhdq},
            {field: '所在航段终', value: base.szhdz},
            {field: '所在行政区', value: base.szxzq},
            {field: '管理单位名', value: base.gldwm},
            {field: '距航道起点', value: base.jhdqd},
            {field: '是否达标', value: base.sfdb},
            {field: '建筑物种类', value: base.jzwzl},
            {field: '建筑物净高', value: base.jzwjg},
            {field: '是否仅在分', value: base.sfjzf},
            {field: '设计最高通', value: base.sjzgt},
            {field: '结构型式', value: base.jgxs},
            {field: '用途分类', value: base.ytfl},
            {field: '设立通航标', value: base.slthb}
        ]

        const res = []
        rows.forEach((row, i) => {
            res.push(<td>{row.field}</td>)
            res.push(<td>{row.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 6) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}{res[i + 2]}{res[i + 3]}{res[i + 4]}{res[i + 5]}</tr>)
        }

        let path = base.path.split(';')
        return (
            <div>
                <Tabs className={'detail-tab'}>
                    <Tab tab="详细信息">
                        <div className="row">
                            <table className="detail-table">
                                <tbody>
                                {resJsx}
                                </tbody>
                            </table>
                        </div>
                    </Tab>

                    <Tab tab="图片信息">

                        <div className="img-container">
                            <img className="building-img"
                                 src={this.state.img || path[0]}/>
                            <div>
                                {
                                    path.map(b => {
                                        return b && (<img className="building-img-sm" src={b}
                                                          onClick={() => {
                                                              this.setState({img: b})
                                                          }}/>)
                                    })
                                }
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )


    }
}

export default BuildingDetail