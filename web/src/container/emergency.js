/**
 * Created by YYSJ on 16/12/7.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import '../../css/app.scss'
import '../../css/eme.scss'
import 'rc-ui/dist/rc-ui.css'
import {Modal} from 'rc-ui'
import List from '../component/eme/List'
import Map from '../component/eme/Map'
import Tool from '../component/eme/Tool'
import Add from '../component/eme/Add'
import Report from '../component/eme/Report'
import End from '../component/eme/End'
import Mater from '../component/eme/Mater'

class Emergency extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            modal: false,
            detail: '',
            title: '',
            footer: '',
            select: {},
            key: 'eme0',
            currentKey: 'current0',
            currentTab:0
        }
    }

    down(index) {
        this.setState({currentIndex: index});
    }


    changeTab = (currentTab) => {
        this.setState({
            currentTab
        })
    }

    handDeal(detail, title, footer) {
        this.setState({modal: true, detail, title, footer})
    }

    handSel = (select, callback) => {
        this.setState({select, key: this.state.key + '0'}, () => {
            callback()
        })
    }

    changeKey = () => {
        this.setState({currentKey: this.state.currentKey + '0'})
    }

    modalFooter(footer) {
        this.setState({
            footer
        })
    }

    closeModal = () => {
        this.setState({
            modal: false,
            detail: '',
            title: '',
            footer: ''
        })
    }


    render() {
        const {modal, title, detail, footer, key, currentKey,currentTab, currentIndex} = this.state
        return (
            <div className="eme-page">
                {/*<Nav/>*/}
                <List select={this.state.select} handSel={this.handSel} key={currentKey}
                      currentTab={currentTab} changeTab={this.changeTab}/>
                <Tool currentTab={currentTab}/>
                <Map select={this.state.select}/>
                <Add changeKey={this.changeKey} key={`add-${key}`}/>
                <Report changeKey={this.changeKey} select={this.state.select} key={`report-${key}`}/>
                <End changeKey={this.changeKey} select={this.state.select} key={`end-${key}`}/>
                <Mater changeKey={this.changeKey} select={this.state.select} key={`mater-${key}`}/>
                <Modal title={title} show={modal} onCancel={() => {
                    this.setState({modal: false})
                }} footer={footer}>
                    {detail}
                </Modal>
            </div>
        )
    }
}

export default Emergency