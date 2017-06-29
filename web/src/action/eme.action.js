/**
 * Created by YYSJ on 16/12/7.
 */
export const CURRENT = 'CURRENT';//预警列表
export const HISTORY = 'HISTORY';//
export const PLAN = 'PLAN';//
export const TOOL = 'TOOL';//
export const DETAIL = 'DETAIL';//
export const MATERIAL = 'MATERIAL';//
export const ADD_INFO = 'ADD_INFO';//
export const SET_CENTER = 'SET_CENTER'
export const ADD_MARKER = 'ADD_MARKER'; //添加点标记
export const RE_MARKER = 'RE_MARKER'; //替换marker
export const RE_MATER = 'RE_MATER'; //替换marker
export const RE_LIST = 'RE_LIST'; //再报记录
export const DOC = 'DOC'; //应急报告
export const CIRCLE = 'CIRCLE'; //圆
export const TRANS = 'TRANS'; //圆

function getRequest(url, param, method) {
    const keys = Object.keys(param)
    let body = ''
    keys.forEach((key) => {
        body += `${key}=${param[key]}&`
    })

    body = body.substring(0, body.length - 1)
    switch (method) {
        case 'get':
            body.length && (body = `?${body}`)
            return new Request(`${url + body}`, {
                'Access-Control-Allow-Credentials': true,
                credentials: 'include',
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


export function setCenter(center) {
    return {
        type: SET_CENTER,
        center
    };
}

export function replaceCircle(circle) {
    return {
        type: CIRCLE,
        circle
    };
}


export function replaceMarker(marker) {
    return {
        type: RE_MARKER,
        marker
    };
}


export function replaceMarter(marker) {
    return {
        type: RE_MATER,
        marker
    };
}


function loadData(type, data) {
    return {
        type,
        data
    };
}


export function getCurrent(param) {
    const request = getRequest('/selectyjsj', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(CURRENT, data))
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

export function getHistory(param) {
    const request = getRequest('/selectyjsjls', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(HISTORY, data))
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

export function getPlan(param) {
    const request = getRequest('/selectyjya', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(PLAN, data))
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


export function changeTool(tool) {
    return {
        type: TOOL,
        tool
    };
}


export function startPlan(param, callback) {
    const request = getRequest('/startya', param, 'get')
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


export function getDetail(param, callback) {
    const request = getRequest('/selectyjsjBase', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(DETAIL, data))
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


export function getMaterial(param) {
    const request = getRequest('/yjzylist', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(MATERIAL, data))
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


export function report(param, callback) {
    const request = getRequest('/insertyjsj', param, 'get')
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

export function reReport(param, callback) {
    const request = getRequest('/insertyjsjcz', param, 'get')
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


export function transMater(param, callback) {
    const request = getRequest('/insertYjdt', param, 'get')
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

export function endEvent(param, callback) {
    const request = getRequest('/insertyjsjzj', param, 'get')
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


export function getAddInfo(param) {
    const request = getRequest('/sjsbcshsj', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(ADD_INFO, data))
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

export function getReList(param) {
    const request = getRequest('/yjzb', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(RE_LIST, data))
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

export function getDoc(param) {
    const request = getRequest('/yjsjgdword', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(DOC, data))
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


export function getTrans(param) {
    const request = getRequest('/getYjdtList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(TRANS, data))
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

