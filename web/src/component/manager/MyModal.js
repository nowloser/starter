import React,{Component} from 'react'
import MAP from 'rc-map'
import {Tabs, Progress, Page, Table, Icon, Modal, Button} from 'rc-ui'

class MyModal extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            percent: 0,
            modal: false
        }
    }

    render() {
        return (
            <div className="demo-block">
                <h2>Modal</h2>
                <Button type={'primary'} onClick={() => {
                    this.setState({modal: true})
                }}>打开modal</Button>
                <Modal title="hello" show={this.state.modal} onCancel={() => {
                    this.setState({modal: false})
                }}>
                    content
                </Modal>

            </div>
        )


    }
}
export default MyModal