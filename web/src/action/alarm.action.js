/**
 * Created by YYSJ on 16/12/7.
 */
export const Data = 'Data';
export const PORT = 'PORT';//预警列表
export const PORT_DETAIL = 'PORT_DETAIL';//预警详情
export const CLEAR_DETAIL = 'CLEAR_DETAIL';//
export const COMPANY = 'COMPANY';//预警企业
export const CLEAR_COMPANY = 'CLEAR_COMPANY';//预警企业
export const SHIP = 'SHIP';//预警船舶
export const CLEAR_SHIP = 'CLEAR_SHIP';//
export const BERTH = 'BERTH';//预警泊位
export const CLEAR_BERTH = 'CLEAR_BERTH';//

export const MONITOR = 'MONITOR';//监控点
export const CLEAR_MONITOR = 'CLEAR_MONITOR';

export const MACHINE = 'MACHINE';//机械设备
export const CLEAR_MACHINE = 'CLEAR_MACHINE';

export const EMPLOYEE = 'EMPLOYEE';//从业人员
export const CLEAR_EMPLOYEE = 'CLEAR_EMPLOYEE';

export const TANK = 'TANK';//储罐
export const CLEAR_TANK = 'CLEAR_TANK';


export const COMPLAIN_COMPANY = 'COMPLAIN_COMPANY';//企业
export const CLEAR_COMPLAIN_COMPANY = 'CLEAR_COMPLAIN_COMPANY';


export const COMPLAIN_BOAT = 'COMPLAIN_BOAT';//船舶
export const CLEAR_COMPLAIN_BOAT = 'CLEAR_COMPLAIN_BOAT';


export const COMPLAIN_SHIP = 'COMPLAIN_SHIP';//泊位
export const CLEAR_COMPLAIN_SHIP = 'CLEAR_COMPLAIN_SHIP';

export const TAG = 'TAG';//
export const STEP = 'STEP';//
export const PERSON = 'PERSON';//
export const COMPLIAN = 'COMPLIAN';//
export const SELECT_BASE = 'SELECT_BASE';//


export const FLOW = 'FLOW';//
export const LAW_PERSON = 'LAW_PERSON';//
export const LAW_INFO = 'LAW_INFO';//
export const YJSX = 'YJSX';//预警事项

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


function loadData(type, data) {
    return {
        type,
        data
    };
}


export function getPortProduction(param) {
    const request = getRequest('/portProduction', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(PORT, data))
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

export function getPortProductionDetail(param) {
    const request = getRequest('/portProductionById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(PORT_DETAIL, data))
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


export function clearPortProductionDetail() {
    return {
        type: CLEAR_DETAIL
    };
}


export function getCompany(param) {
    const request = getRequest('/qyById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPANY, data))
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

export function clearCompany() {
    return {
        type: CLEAR_COMPANY
    };
}


export function getShip(param) {
    const request = getRequest('/warningShipById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(SHIP, data))
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

export function clearShip() {
    return {
        type: CLEAR_SHIP
    };
}


export function getBerth(param) {
    const request = getRequest('/warningBerthById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(BERTH, data))
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


export function clearBerth() {
    return {
        type: CLEAR_BERTH
    };
}


/*监控点*/
export function getMonitor(param) {
    const request = getRequest('/gczById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(MONITOR, data))
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


export function clearMonitor() {
    return {
        type: CLEAR_MONITOR
    };
}


/*机械设备*/
export function getMachine(param) {
    const request = getRequest('/jxsbxxById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(MACHINE, data))
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


export function clearMachine() {
    return {
        type: CLEAR_MACHINE
    };
}

/*从业人员*/
export function getEmployee(param) {
    const request = getRequest('/gkcyryById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(EMPLOYEE, data))
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


export function clearEmployee() {
    return {
        type: CLEAR_EMPLOYEE
    };
}

/*储罐*/
export function getTank(param) {
    const request = getRequest('/cgjbxxById', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(TANK, data))
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


export function clearTank() {
    return {
        type: CLEAR_TANK
    };
}


/*12328企业*/
export function getComplianCompany(param) {
    const request = getRequest('/syqyBasic', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPLAIN_COMPANY, data))
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


export function clearComplianCompany() {
    return {
        type: CLEAR_COMPLAIN_COMPANY
    };
}


/*12328船舶*/
export function getComplianBoat(param) {
    const request = getRequest('/sycblbBasic', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPLAIN_BOAT, data))
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


export function clearComplianBoat() {
    return {
        type: CLEAR_COMPLAIN_BOAT
    };
}


/*12328泊位*/
export function getComplianShip(param) {
    const request = getRequest('/bwInformationList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPLAIN_SHIP, data))
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


export function clearComplianShip() {
    return {
        type: CLEAR_COMPLAIN_SHIP
    };
}


export function toggleTag(tag) {
    return {
        type: TAG,
        tag
    };
}


/*转办*/
export function putTurnTo(param, callback) {
    const request = getRequest('/turnTo', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/*回退*/
export function putBackTo(param, callback) {
    const request = getRequest('/backTo', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/*办结*/
export function putEnd(param, callback) {
    const request = getRequest('/endRw', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*12328转办*/
export function putTurnToComplain(param, callback) {
    const request = getRequest('/turnToTsjkxx', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/*12328回退*/
export function putBackToComplain(param, callback) {
    const request = getRequest('/backToTsjkxx', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/*12328办结*/
export function putEndComplain(param, callback) {
    const request = getRequest('/endTsjkxx', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*下一步骤*/
export function getBzList(param) {
    const request = getRequest('/bzList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(STEP, data))
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

/*下一人员*/
export function getRyList(param) {
    const request = getRequest('/ryList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(PERSON, data))
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


/*投诉监控*/
export function getTsjkList(param) {
    const request = getRequest('/tsjkList', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(COMPLIAN, data))
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

/*删除*/
export function deletetsjkxxa(param, callback) {
    const request = getRequest('/deletetsjkxx', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*添加*/
export function addComplain(param, callback) {
    const request = getRequest('/inserttsjkxx', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/**/
export function transReport(param, callback) {
    const request = getRequest('/yjyjcz', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}

/*预警移交执法*/
export function transLaw(param, callback) {
    // const request = getRequest('/transferZf', param, 'get')
    // fetch(request).then(
    //     function (res) {
    //         if (res.ok) {
    //             res.json().then(function (data) {
    //                 callback(data)
    //             });
    //         } else {
    //         }
    //     }, function (e) {
    //         console.log("error", e)
    //     }
    // )


    const request = getRequest('/transferZf', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(LAW_INFO, data))
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


/*办结*/
export function saveTrans(param, callback) {
    const request = getRequest('/transferZfSave', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*12328移交执法*/
export function transComplainLaw(param, callback) {
    const request = getRequest('/transferJkxxZf', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*保存12328移交执法信息*/
export function saveTransComplainLaw(param, callback) {
    const request = getRequest('/transferJkxxZfSave', param, 'get')
    fetch(request).then(
        function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    callback(data)
                });
            } else {
            }
        }, function (e) {
            console.log("error", e)
        }
    )
}


/*12328投诉监控—添加功能下拉框信息*/
export function selectBase(param, callback) {
    const request = getRequest('/selectBase', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(SELECT_BASE, data))
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


export function getFlow(param) {
    const request = getRequest('/rwlcxq', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(FLOW, data))
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

export function getLawPerson(param = {}) {
    const request = getRequest('/zfrySelect', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(LAW_PERSON, data))
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

export function getYjsx(param = {}) {
    const request = getRequest('/getYjsx', param, 'get')
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res.json().then(function ({data}) {
                        dispatch(loadData(YJSX, data))
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


