import React, {Component} from 'react'
import {Button} from 'rc-ui'
import OcxMixin from "./ocxMixin"
import {getChans} from '../../action/map.action'
class VideoOcx extends Component {
    constructor({data}) {
        super()
        this.state = {
            chs: [],
            index: 0
        }
        this.sCameraID = data.sbjcxx_id;//设备ID
        this.sChannelID = '';//通道ID
        this.$hwnd = null;//视频面板
    }

    componentDidMount() {
        this.WebOcx = new OcxMixin();//控件实例
        this.start()
        const {data} = this.props
        getChans({sbid: data.sbjcxx_id}, (data) => {
            this.setState({
                chs: data.data
            })
            this.sChannelID = data.data[0].tdid
            if (this.sChannelID) {
                this.videoEvent("PLAY");
            }
        })

    }

    componentWillUnmount() {
        this.videoEvent('DESTROY')
    }

    play = () => {
        this.videoEvent("PLAY");
    }

    pause = () => {
        this.videoEvent("PAUSE");
    }

    start() {
        this.$hwnd = this.WebOcx.$el.InitPanel(12, 12, 552, 418, 0);//初始化视频面板
        this.WebOcx.$el.SetWindowsNumber(1);//设置屏幕个数
        this.lResult = this.WebOcx.$el.Initial(0);//控件初始化
        this.WebOcx.$el.PlayType(0, 0);//设置视频面板类型 第一个参数无意义，第二个参数 1为录像回放面板 0为实时视频面板
        if (this.lResult == 0) {
            let userName = "ganghangocx@wz", userPassword = "1qaz3edc2wsx", loginIp = "42.50.0.5", loginPort = 6666;
            // let userName ="hktest2@zjxc.zj.ge",userPassword ="1234",loginIp="122.224.82.77",loginPort ="6666";
            let lResult = this.WebOcx.$el.Login(loginIp, loginPort, "", userName, userPassword);
            console.log(lResult)
            if (lResult == 0) {
                // alert("登录失败!")
                console.log('login success')
                // setTimeout(() => {
                //     this.videoEvent("PLAY");
                // }, 1000)
            } else {
                console.log('login fail')

                // alert("登录失败!")
            }

        } else {
            // alert("初始化失败");
        }
    }

    //视频的功能
    videoEvent(type) {
        switch (type) {
            case "PLAY"://播放
                this.WebOcx.$el.PlayVideo(this.$hwnd, this.sCameraID, this.sChannelID);
                break;
            case "STOP"://暂停
                this.WebOcx.$el.StopVideo(this.$hwnd);
                break;
            case "DESTROY"://释放控件
                this.WebOcx.$el.StopVideo(this.$hwnd);
                this.WebOcx.$el.StopPlayRecord(this.$hwnd);
                this.WebOcx.$el.Logout();
                this.WebOcx.$el.Free();
                break;
            default:
                break;
        }
    }

    sel = (i) => {
        this.sChannelID = this.state.chs[i].tdid
        this.pause()
        this.play()
        this.setState({
            index: i
        })
    }

    render() {
        return (
            <div>
                <div id="videoPanel"></div>
                <div className="play-container">
                    <div>
                        {this.state.chs.map((t, i) => {
                            return <Button type={i === this.state.index ? 'primary' : 'default'}
                                           onClick={this.sel.bind(this, i)}>{t.tdmc}</Button>
                        })}
                    </div>
                    <Button onClick={this.play}>播放</Button>
                    <Button onClick={this.pause}>暂停</Button>
                </div>
            </div>
        )
    }
}
export default VideoOcx;