/**
 * Created by xiangfahai on 2016/10/16.
 */
export default function reduxLog({getState,dispatch}) {
    return next => action => {//next是store.dispatch,action是action
        //console.time('日志中间件')
        //console.log(action)
        next(action)
        //console.timeEnd('日志中间件')
    }
}


