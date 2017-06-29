/**
 * Created by xiangfahai on 2017/5/3.
 */

import $ from 'jquery'
import {getBerthList} from '../action/map.action'
// $.ajax({
//     url: '/videoMonitor',
//     type: 'get',
//     datatype: 'json',
//     data: {page: 1, pageSize: 10000},
//     success: function (data) {
//         // console.log(data.data)
//         data.data.data.forEach(d => {
//             let name = d.sbmc
//             if (+name.substring(name.length - 1)) {
//                 name = name.substring(0, name.length - 1)
//             }
//             if (d.sbtdxx_id == '4E0F7BB55ACDC979E05012AC8A1930D3') {
//                 // console.log(d)
//             }
//             $.ajax({
//                 url: 'http://www.supermapol.com/iserver/services/location-china/rest/locationanalyst/China/geocoding.json',
//                 type: 'get',
//                 datatype: 'json',
//                 data: {
//                     address: name,
//                     city: '温州市',
//                     to: 910101,
//                     key: 'fvV2osxwuZWlY0wJb8FEb2i5'
//                 },
//                 success: function (pos) {
//                     $.ajax({
//                         url: '/updateTdxxjwd',
//                         type: 'post',
//                         datatype: 'json',
//                         data: {
//                             sbtdxx_id: d.sbtdxx_id,
//                             jd: pos[0].location.x,
//                             wd: pos[0].location.y
//                         }
//                     })
//                 }
//             })
//         })
//     }
// })


// $.ajax({
//     url: 'http://www.supermapol.com/iserver/services/location-china/rest/locationanalyst/China/geocoding.json',
//     type: 'get',
//     datatype: 'json',
//     data: {
//         address: '温州市瓯江三桥',
//         city: '温州市',
//         to: 910101,
//         key: 'fvV2osxwuZWlY0wJb8FEb2i5'
//     },
//     success: function (pos) {
//         console.log(pos)
//     }
// })
$.ajax({
    url: '/bwDataSource',
    type: 'get',
    datatype: 'json',
    data: {page: 1, pageSize: 10000},
    success:function (action) {
        const data = action.data.data

        console.log(data)
        data.forEach(d => {
            $.ajax({
                url: 'http://www.supermapol.com/iserver/services/location-china/rest/locationanalyst/China/geocoding.json',
                type: 'get',
                datatype: 'json',
                data: {
                    address: d.bwmc,
                    city: '温州市',
                    to: 910101,
                    key: 'fvV2osxwuZWlY0wJb8FEb2i5'
                },
                success: function (pos) {
                    if (pos.length) {
                        $.ajax({
                            url: '/updatebwjwd',
                            type: 'get',
                            datatype: 'json',
                            data: {
                                bwxx_id: d.bwxx_id,
                                jd: pos[0].location.x,
                                wd: pos[0].location.y
                            },
                            success: function (data) {
                                console.log(data)
                            }
                        })
                    }


                }
            })
        })
    }
})
// getBerthList({page: 1, pageSize: 100000})((action) => {
//     const data = action.data.data
//
//     console.log(data)
//     data.forEach(d => {
//         $.ajax({
//             url: 'http://www.supermapol.com/iserver/services/location-china/rest/locationanalyst/China/geocoding.json',
//             type: 'get',
//             datatype: 'json',
//             data: {
//                 address: d.bwmc,
//                 city: '温州市',
//                 to: 910101,
//                 key: 'fvV2osxwuZWlY0wJb8FEb2i5'
//             },
//             success: function (pos) {
//                 if (pos.length) {
//                     $.ajax({
//                         url: '/updatebwjwd',
//                         type: 'get',
//                         datatype: 'json',
//                         data: {
//                             ywdwbm: d.bwxx_id,
//                             jd: pos[0].location.x,
//                             wd: pos[0].location.y
//                         },
//                         success: function (data) {
//                             console.log(data)
//                         }
//                     })
//                 }
//
//
//             }
//         })
//     })
//
// })