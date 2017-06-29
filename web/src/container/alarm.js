/**
 * Created by YYSJ on 16/12/7.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import '../../css/app.scss'
import Menu from '../component/alarm/menu.jsx'
import Alarm from '../component/alarm/Alarm'
import Complain from '../component/alarm/complain'
import 'rc-ui/dist/rc-ui.css'
import {Modal} from 'rc-ui'

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            modal: false,
            detail: '',
            title: '',
            footer: ''
        }

    }

    down(index) {
        this.setState({currentIndex: index});
    }

    handDeal(detail, title, footer) {
        this.setState({modal: true, detail, title, footer})
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
        const {modal, title, detail, footer, currentIndex} = this.state
        return (
            <div className="alarm-page">
                {/*<Nav/>*/}
                <Menu currentIndex={this.state.currentIndex} onClick={this.down.bind(this)}/>
                <div className="right-box">
                    {currentIndex === 0 &&
                    <Alarm handDeal={this.handDeal.bind(this)} modalFooter={this.modalFooter.bind(this)}
                           closeModal={this.closeModal}/>}
                    {currentIndex === 1 &&
                    <Complain handDeal={this.handDeal.bind(this)} modalFooter={this.modalFooter.bind(this)}
                              closeModal={this.closeModal}/>}
                </div>
                <Modal title={title} show={modal} onCancel={() => {
                    this.setState({modal: false})
                }} footer={footer}>
                    {detail}
                </Modal>
            </div>
        )
    }
}

export default App

//
// function run(taskDef) {
//     let task = taskDef(); // 启动任务
//     let result = task.next(); // 递归使用函数来进行迭代
//     (function step() {
//         if (!result.done) {
//             let promise = Promise.resolve(result.value);
//             promise.then(function (value) {
//                 result = task.next(value);
//                 step();
//             })
//         }
//     }());
// }
// function readFile() {
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             resolve(1000)
//         }, 2000)
//     });
// }
//
// function doSomethingWith(contents) {
//     console.log(contents)
// }
// run(function*() {
//     let contents = yield readFile();
//     doSomethingWith(contents);
//     let contents1 = yield readFile();
//     doSomethingWith(contents1);
//     console.log("Done");
// });