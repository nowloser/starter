import {getRequest, loadData,dealAsync} from './action.util'

export const FLIGHT = 'FLIGHT';

export function getFlight(param) {
    return dealAsync({
        url:'/cbhbDataSource',
        param,
        type:'get',
        dataType:'json',
        success:function({data},dispatch){
            dispatch(loadData(FLIGHT, data))
        }
    })
}

