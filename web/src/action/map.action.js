export const SET_CENTER = 'SET_CENTER'
export const ADD_MARKER = 'ADD_MARKER'; //添加点标记
export const RE_MARKER = 'RE_MARKER'; //替换marker
export const RE_CLUSTER = 'RE_CLUSTER'; //替换cluster
export const ADD_POLYLINE = 'ADD_POLYLINE'; //添加折线
export const RE_POLYLINE = 'RE_POLYLINE'; //添加折线
export const LOAD_HEADER = 'LOAD_HEADER'
export const COMPANY = 'COMPANY'
export const CHANNEL = 'CHANNEL'; //航道
export const BEACON = 'BEACON'; //航标
export const TRUCK = 'TRUCK'; //集卡
export const LOADING = 'LOADING'
export const COMPLETE = 'COMPLETE'
export const ADD_WINDOW = 'ADD_WINDOW'
export const YEAR_VERIFY = 'YEAR_VERIFY';//年审
export const YEAR_CHECK = 'YEAR_CHECK';//年检
export const DANGER_DETAIL = 'DANGER_DETAIL'; //港口企业详细信息
export const WATER_DETAIL = 'WATER_DETAIL'; //水运企业详细信息
export const BOAT_DETAIL = 'BOAT_DETAIL'; //船舶详细信息
export const BOAT = 'BOAT'; //船舶
export const PROJECT = 'PROJECT'; //工程
export const MAINTAIN = 'MAINTAIN'; //航道养护
export const BUILDING = 'BUILDING'; //涉航建筑物
export const VIDEO = 'VIDEO'; //视频
export const ALARM = 'ALARM'; //预警
export const FLOW = 'FLOW'; //船舶流量
export const BERTH_INFO = 'BERTH_INFO'; //泊位信息
export const PIER_INFO = 'PIER_INFO'; //码头信息
export const MECHANICAL_INFO = 'MECHANICAL_INFO'; //机械设备信息
export const EMPLOYEE_INFO = 'EMPLOYEE_INFO'; //从业人员信息
export const WATER_EMPLOYEE = 'WATER_EMPLOYEE'; //海机务人员
export const WARNING_INFO = 'WARNING_INFO'; //安全隐患
export const COMPANY_BOATS = 'COMPANY_BOATS'; //船舶列表
export const RE_HOT = 'RE_HOT'; //热力图
export const CHANGE_COLOR = 'CHANGE_COLOR'; //
export const SELECT = 'SELECT'; //搜索种类
export const LAYER = 'LAYER'; //覆盖物
export const STAT = 'STAT'; //统计
export const FLOW_STAT = 'FLOW_STAT'; //流量统计
export const BERTH = 'BERTH'; //泊位
export const BERTH_DETAIL = 'BERTH_DETAIL'; //泊位详细信息
export const HIS_TRAIL = 'HIS_TRAIL'; //
export const TRAIL_MARKER = 'TRAIL_MARKER'; //
export const TRAIL_SIGN = 'TRAIL_SIGN'; //
export const WORK_BERTH = 'WORK_BERTH'; //


import store from '../store/map.store';

export function setCenter(center) {
    return {
        type: SET_CENTER,
        center
    };
}

export function loading() {
    return {
        type: LOADING
    };
}

export function complate() {
    return {
        type: COMPLETE
    };
}


export function addMarker(marker) {
    return {
        type: ADD_MARKER,
        marker
    };
}


export function addTrail(marker) {
    return {
        type: TRAIL_MARKER,
        marker
    };
}


export function addSign(marker) {
    return {
        type: TRAIL_SIGN,
        marker
    };
}


export function changeColor(color) {
    return {
        type: CHANGE_COLOR,
        color
    };
}

/*搜索选择*/
export function changeSelect(select) {
    return {
        type: SELECT,
        select
    };
}

/*地图类型*/
export function changeLayer(layer) {
    return {
        type: LAYER,
        layer
    };
}


export function changeStat(stat) {
    return {
        type: STAT,
        stat
    };
}


export function replaceMarker(markers) {
    return {
        type: RE_MARKER,
        markers
    };
}

export function replaceHot(hot) {
    return {
        type: RE_HOT,
        hot
    };
}

export function replaceCluster(cluster) {
    return {
        type: RE_CLUSTER,
        cluster
    };
}

export function addPloyline(polyline) {
    return {
        type: ADD_POLYLINE,
        polyline
    };
}

export function replacePolyline(polyline) {
    return {
        type: RE_POLYLINE,
        polyline
    };
}

export function addWindow(window) {
    return {
        type: ADD_WINDOW,
        window
    };
}


function loadData(type, data) {
    return {
        type,
        data
    };
}


function getRequest(url, param, method) {
    const keys = Object.keys(param)
    let body = ''
    keys.forEach((key) => {

        if (typeof param[key] === 'object') {
            body += `${key}=${JSON.stringify(param[key])}&`
        } else {
            body += `${key}=${param[key]}&`
        }
    })

    body = body.substring(0, body.length - 1)
    switch (method) {
        case 'get':
            body.length && (body = `?${body}`)
            return new Request(`${url + body}`, {
                method: "GET",
                mode: "no-cors"
            });
        case 'post':
            return new Request(`${url}`, {
                method: "POST",
                mode: "no-cors",
                body
            });
    }


}

/*获取监控指标*/
export function getHeader() {
    const request = new Request('/headerData', {
        method: "GET",
        mode: "no-cors",
    });

    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(LOAD_HEADER, data))
                    });
                } else {
                    alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取企业列表*/
export function getCompany(param) {
    const request = getRequest('/qyDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 1) {
                            dispatch(complate())
                            dispatch(loadData(COMPANY, data))
                        }

                    });
                } else {
                    alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取船舶列表*/
export function getBoat(param) {
    const request = getRequest('/cbDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 2) {
                            dispatch(complate())
                            dispatch(loadData(BOAT, data))
                        }
                    });
                } else {
                    // alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*获取船舶列表*/
export function getBoatPos(param) {
    const request = getRequest('/cbwzDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 2) {
                            dispatch(complate())
                            dispatch(loadData(BOAT, data))
                        }
                    });
                } else {
                    // alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


export function getMudBoat(param) {
    const request = getRequest('/nhnjcgis', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 2) {
                            dispatch(complate())
                            dispatch(loadData(BOAT, data))
                        }
                    });
                } else {
                    // alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取航道列表*/
export function getChannel(param) {
    const request = getRequest('/hdDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 5) {
                            dispatch(complate())
                            dispatch(loadData(CHANNEL, data))
                        }
                    });
                } else {
                    alert("监控指标获取异常")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取航标列表*/
export function getBeacon(param) {
    const request = getRequest('/hbDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 4) {
                            dispatch(complate())
                            dispatch(loadData(BEACON, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*获取工程列表*/
export function getProject(param) {
    const request = getRequest('/gcDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 3) {
                            dispatch(complate())
                            dispatch(loadData(PROJECT, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


export function getBerthList(param) {
    const request = getRequest('/bwDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 3) {
                            dispatch(complate())
                            dispatch(loadData(BERTH, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


export function getBerthDetail(param) {
    const request = getRequest('/bwBasic', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(BERTH_DETAIL, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取航道养护列表*/
export function getMaintain(param) {
    const request = getRequest('/hdyhDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 8) {
                            dispatch(complate())
                            dispatch(loadData(MAINTAIN, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }
}


/*获取涉航建筑物列表*/
export function getBuilding(param) {
    const request = getRequest('/shjzwDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 8) {
                            dispatch(complate())
                            dispatch(loadData(BUILDING, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }
}


/*获取水运企业基本信息*/
export function getWaterInfo(param,) {
    const request = getRequest('/syqyBasic', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })

}


/*获取水运企业基本信息*/
export function getWaterBasic(param) {
    const request = getRequest('/syqyBasic', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(WATER_DETAIL, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }
}

/*获取水运企业业务信息*/
export function getWaterBusiness(param) {
    const request = getRequest('/syqyInformation', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })
}

/*获取港口企业基本信息*/
export function getDangerInfo(param) {
    const request = getRequest('/gkqyBasic', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })
}

/*获取港口企业业务信息*/
export function getDangerBusiness(param) {
    const request = getRequest('/gkqyInformation', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })
}


/*获取港口企业详细信息*/
export function getDangerDetail(param) {
    const request = getRequest('/gkqyBase', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(DANGER_DETAIL, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取船舶基本信息*/
export function getBoatInfo(param) {
    const request = getRequest('/sycbBasic', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })

}

/*获取船舶详细信息*/
export function getBoatDetail(param) {
    const request = getRequest('/sycbBase', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(BOAT_DETAIL, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*视频*/
export function getVideos(param) {
    const request = getRequest('/videoMonitor', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 6) {
                            dispatch(complate())
                            dispatch(loadData(VIDEO, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*高速集卡*/
export function getTruck(param) {
    const request = getRequest('/gssfDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 9) {
                            dispatch(complate())
                            dispatch(loadData(TRUCK, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*预警统计*/
export function getAlarmTotal() {
    const request = getRequest('/yjzbCount', {}, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(ALARM, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*船舶流量*/
export function getFlow(param) {
    const request = getRequest('/cbllDataSource', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        if (store.getState().select === 7) {
                            dispatch(complate())
                            dispatch(loadData(FLOW, data))
                        }
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*获取泊位信息*/
export function getBerth(param) {
    const request = getRequest('/bwInformationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(BERTH_INFO, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取码头信息*/
export function getPier(param) {
    const request = getRequest('/mtInformationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(PIER_INFO, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*获取机械设备信息*/
export function getMechanical(param) {
    const request = getRequest('/jxsbInFormationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(MECHANICAL_INFO, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*从业人员*/
export function getEmployee(param) {
    const request = getRequest('/cyryInFormationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(EMPLOYEE_INFO, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*海机务人员*/
export function getWaterEmployee(param) {
    const request = getRequest('/sycyryInFormationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(WATER_EMPLOYEE, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*安全隐患信息*/
export function getWarning(param) {
    const request = getRequest('/aqyhInFormationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(WARNING_INFO, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*船舶列表*/
export function getCompanyBoats(param) {
    const request = getRequest('/sycblbBasic', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPANY_BOATS, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*年审*/
export function getYearVerify(param) {
    const request = getRequest('/nsBasicList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(YEAR_VERIFY, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}


/*流量统计*/
export function getFlowStat(param) {
    const request = getRequest('/cbmapdata', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(FLOW_STAT, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}

/*船舶历史轨迹*/
export function getHisTrans(param) {
    const request = getRequest('/selectCbData', param, 'get')
    return new Promise(resolve => {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        resolve(data)
                    });
                } else {
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    })

}


export function transJwd(param, callback) {
    const request = getRequest('http://www.supermapol.com/iserver/services/coordconvert/rest/coordinate/convert.json', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
                alert("")
            }
        }, function (e) {
            console.log("error", e)
        }
    )

}


export function getChans(param, callback) {
    const request = getRequest('/videoMonitors', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function ({data}) {
                    callback(data)
                });
            } else {
                alert("")
            }
        }, function (e) {
            console.log("error", e)
        }
    )

}


export function getWorkBerth(param, callback) {
    const request = getRequest('/getZybwXx', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(WORK_BERTH, data))
                    });
                } else {
                    alert("")
                }
            }, function (e) {
                console.log("error", e)
            }
        )
    }

}







