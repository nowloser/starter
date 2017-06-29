import React, {Component} from 'react'
import classnames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {
    getWorkBerth
} from '../../action/map.action'
import {connect} from 'react-redux'

const Tab = Tabs.Tab
/**
 * 水运企业详细信息
 * */
const Path = Icon.Path
const icons = Icon.icons
class WorkBerth extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getWorkBerth({page: 1, pageSize: 10}))
    }

    handPage = (page) => {
        const {dispatch} = this.props
        dispatch(getWorkBerth({page, pageSize: 10}))
    }

    render() {

        const {workBerth} = this.props
        return (
            <div>
                <Table
                    column={[{title: '序号', filed: 'xh'},
                        {title: '泊位名称', filed: 'bwmc'},
                        {title: '主要用途', filed: 'zyyt'},
                        {title: '设计吨位（吨）', filed: 'sjkbnl'},
                        {title: '泊位长度（米）', filed: 'bwcd'},
                        {title: '系泊船舶', filed: 'cbmc'},
                        {title: 'MMSI号', filed: 'mmsi'},
                        {title: '航行状态', filed: 'cbhxzt'}
                    ]}
                    className='berth-table'
                    data={workBerth.data}
                    pagination={false}
                    pageChange={this.handPage}
                    pageSize={10}
                    total={workBerth.data.length}
                    auto={true}/>
            </div>
        )


    }
}

function mapStateToProps({workBerth}) {
    return {workBerth}
}

export default connect(mapStateToProps)(WorkBerth)