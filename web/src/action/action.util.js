export function getRequest(url, param, method) {
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

export function loadData(type, data) {
    return {
        type,
        data
    };
}

function fn() {

}

export function dealAsync({url, param={}, type, dataType,success=fn,fail=fn,error=fn}) {
    const request = getRequest(url, param, type)
    return function (dispatch) {
        fetch(request).then(
            function (res) {
                if (res.ok) {
                    res[dataType]().then(function (data) {
                        success(data,dispatch)
                    });
                } else {
                    fail()
                }
            }, function (e) {
                error(e)
            }
        )
    }
}