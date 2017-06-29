import React, {Component} from 'react'
import '../../css/nav.scss'
import '../../font/iconfont.css'
import {Dropdown, Icon, Button, Page, Spin, Progress} from 'rc-ui'
import * as cusIcons from './cusIcons'
const Path = Icon.Path

import {getQueryString} from  './util'
class Nav extends Component {
    constructor() {
        super()
        // console.log(getQueryString('userId'))
        this.userId = getQueryString('userId') || '4028d5815aa27a2b015aa2816caa0016'
        // document.cookie = "userId=" + '4028d5815aa27a2b015aa2816caa0016' + "; path=/";
        document.cookie = `userId=${this.userId}; path=/`;
    }

    getCurrentDate() {
        let timeStr = '';
        let curDate = new Date();
        let curYear = curDate.getFullYear();   //获取当前年份(2位)
        let curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
        let curDay = curDate.getDate();       //获取当前日(1-31)
        let curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
        let curHour = curDate.getHours();      //获取当前小时数(0-23)
        let curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
        let curSec = curDate.getSeconds();      //获取当前秒数(0-59)
        timeStr = curYear + '-' + curMonth + '-' + curDay + ' ';

        if (curHour < 10) {
            if (curMinute < 10) {
                if (curSec < 10) {
                    timeStr += ' 0' + curHour + ':0' + curMinute + ' ';
                }
                else {
                    timeStr += ' 0' + curHour + ':0' + curMinute + ' ';
                }
            }
            else {
                if (curSec < 10) {
                    timeStr += ' 0' + curHour + ':' + curMinute + ' ';
                }
                else {
                    timeStr += ' 0' + curHour + ':' + curMinute + ' ';
                }
            }
        }
        else {
            if (curMinute < 10) {
                if (curSec < 10) {
                    timeStr += ' ' + curHour + ':0' + curMinute + ' ';
                }
                else {
                    timeStr += ' ' + curHour + ':0' + curMinute + ' ';
                }
            }
            else {
                if (curSec < 10) {
                    timeStr += ' ' + curHour + ':' + curMinute + ' ';
                }
                else {
                    timeStr += ' ' + curHour + ':' + curMinute + ' ';
                }
            }
        }
        switch (curWeekDay) {
            case 0:
                timeStr += '星期日';
                break;
            case 1:
                timeStr += '星期一';
                break;
            case 2:
                timeStr += '星期二';
                break;
            case 3:
                timeStr += '星期三';
                break;
            case 4:
                timeStr += '星期四';
                break;
            case 5:
                timeStr += '星期五';
                break;
            case 6:
                timeStr += '星期六';
                break;
        }
        return timeStr
    }

    render() {
        return (
            <div className="nav">
                <div className="nav-left">
                    <span>温州港航运行监测与应急平台</span>
                    <div className="timeStr">{this.getCurrentDate()}</div>
                    <div className="link-icon-container">
                        <a href={`/html/map.html?userId=${this.userId}`}>
                            <Icon>
                                {Array.isArray(cusIcons.camerca) ? (cusIcons.bj.map((icon, i) => <Path
                                        d={icon} key={`bj${i}`}/>)) :
                                    <Path d={cusIcons.camerca}/>}
                            </Icon>
                        </a>
                        <a href={`/html/alarm.html?userId=${this.userId}`}>
                            <Icon>
                                {Array.isArray(cusIcons.bj) ? (cusIcons.bj.map((icon, i) => <Path
                                        d={icon} key={`bj${i}`}/>)) :
                                    <Path d={cusIcons.bj}/>}
                            </Icon>
                        </a>
                        <a href={`/html/emergency.html?userId=${this.userId}`}>
                            <Icon>
                                <Path d={cusIcons.eme}/>
                            </Icon>
                        </a>
                    </div>
                </div>
                <div className="nav-right">
                    <Icon>
                        <Path d={cusIcons.shutdown}/>
                    </Icon>
                </div>
            </div>
        )
    }
}
export default Nav