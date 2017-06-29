import React,{Component} from 'react'
import '../../../css/nav.scss'

class DateComponent extends Component{
    getCurrentDate() {
        var timeStr = '';
        var curDate = new Date();
        var curYear = curDate.getFullYear();   //获取当前年份(2位)
        var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
        var curDay = curDate.getDate();       //获取当前日(1-31)
        var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
        var curHour = curDate.getHours();      //获取当前小时数(0-23)
        var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
        var curSec = curDate.getSeconds();      //获取当前秒数(0-59)
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
    render(){
        return(
            <div className="timeStr">{this.getCurrentDate()}</div>
        )
    }
}
export default DateComponent