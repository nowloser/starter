import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table, Card, Input} from 'rc-ui'
import {connect} from 'react-redux';
import * as cusIcons from '../cusIcons';
import classnames from 'classnames'
import {getMaterial, changeTool, transMater, replaceMarter, replaceCircle, getTrans} from '../../action/eme.action'
import moment from 'moment'
import {millToString} from '../util'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

const CardHeader = Card.CardHeader
const CardBody = Card.CardBody
const CardFooter = Card.CardFooter

class Mater extends Component {
    constructor() {
        super();
        this.state = {
            selectRows: [],
            type: new Set([1]),
            jl: 3
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        // dispatch(replaceMarter([]))
    }

    /*多选*/
    onSelectChange = (selectRows) => {
        this.setState({
            selectRows
        })
    }

    handType = (i) => {
        if (this.state.type.has(i)) {
            this.state.type.delete(i)
        } else {
            this.state.type.add(i)
        }
        this.setState({
            type: this.state.type
        })
    }

    getMaterialClass = (i) => {
        const active = this.state.type.has(i)
        return classnames({
            active
        })
    }

    search = () => {
        const {dispatch, select} = this.props
        const jl = this.state.jl
        const param = {
            jl,
            jd: select.jd,
            wd: select.wd,
            flag: [...this.state.type].sort().join(',')
        }
        dispatch(getMaterial(param))

        dispatch(replaceCircle([{
            center: [select.jd, select.wd],
            radius: .009 * jl//10
        }]))


    }
    changeDistance = (event) => {
        this.setState({
            jl: event.target.value
        })
    }
    closeCard = () => {
        const {dispatch, select} = this.props
        dispatch(changeTool(0))
        dispatch(replaceMarter([]))
        select && dispatch(getTrans({urgent_id: select.urgent_id}))
        const {changeKey} = this.props
        changeKey()

    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props
        if (nextProps.material != this.props.material) {
            const markers = nextProps.material.data.map((m) => {
                let icon = '../images/pos.png'
                if (m.mc) {
                    icon = '../images/wz.png'
                }

                if (m.xm) {
                    icon = '../images/zf.png'
                }

                if (m.tdmc) {
                    icon = '../images/sprites/sp.png'
                }
                return {
                    position: [m.jd, m.wd],
                    icon: icon,
                    rotate: 0,
                    size: [26, 32]
                }
            })
            dispatch(replaceMarter(markers))

        }

    }

    trans = () => {
        const {material, dispatch} = this.props
        if (!this.state.selectRows.length) {
            alert('请选择应急物资')
            return
        }

        const {select} = this.props
        const param = {}
        param.urgent_id = select.urgent_id
        param.jsbj = this.state.jl
        param.jd = select.jd
        param.wd = select.wd
        console.log(this.state.selectRows)
        const yjzymcList = this.state.selectRows.map((index) => {
            const row = material.data[index]
            // row.xm || row.mc || row.tdmc
            if (row.xm) {
                return `${row.xm},1,${row.zfryid},${row.jd},${row.wd}`
            }
            if (row.mc) {
                return `${row.mc},2,${row.yjwz_id},${row.jd},${row.wd}`
            }
            if (row.tdmc) {
                return `${row.tdmc},3,${row.sbid},${row.jd},${row.wd}`
            }
        })


        param.yjzymcList = yjzymcList.join(';')
        console.log(param)
        transMater(param, (data) => {
            alert(data.msg)
            this.closeCard()
            dispatch(getTrans({urgent_id: select.urgent_id}))
        })
    }

    render() {
        const {tool, material} = this.props
        const {selectRows} = this.state;
        const addClass = classnames({
            'trans-card': true,
            active: tool === 4
        })
        return (
            <Card className={addClass}>
                <CardHeader tool={<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                    <Path d={icons.close}/>
                </Icon>}>
                    应急调度
                </CardHeader>
                <div style={{padding: '6px'}}>
                    <div className="search-box">
                        <label>周边（千米）:</label>
                        <Input className='search-input' type="text"
                               defaultValue={this.state.jl} onChange={this.changeDistance}/>
                        <Button type='primary' className='search-btn' onClick={this.search}>查询</Button>
                        <Button type='primary' className='search-btn' onClick={this.trans}>调运</Button>
                    </div>

                    <div className="search-box">
                        <label>类型:</label>
                        {['全部', '执法人员', '应急物资', '视频'].map((t, i) => {
                            return <span className={this.getMaterialClass(i + 1)}
                                         onClick={this.handType.bind(this, i + 1)}>{t}</span>
                        })}
                    </div>
                    <Table
                        column={[{
                            title: '名称', filed: 'mc', render(value, index, row){
                                return row.xm || row.mc || row.tdmc
                            }
                        }, {title: '距离', filed: 'jl'}]}
                        data={material.data}
                        border={false}
                        auto={true}
                        className='search-table'
                        select={{
                            onSelectChange: this.onSelectChange,
                            selectRows: selectRows
                        }}/>
                </div>
            </Card>
        )
    }
}

function mapProps({tool, material}) {
    return {tool, material}
}
export default connect(mapProps)(Mater)
