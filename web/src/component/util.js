export function millToString(mills) {
    var date = new Date(mills)
    if (date.getFullYear()) {
        return date.getFullYear() + "-" +
            ((date.getMonth() + 1 ) > 9 ? (date.getMonth() + 1 ) : ('0' + (date.getMonth() + 1 ))) + "-" +
            (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())) + " " +
            (date.getHours() > 9 ? date.getHours() : ('0' + date.getHours() )) + ":" +
            (date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())) + ":" +
            (date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds()))
    }
}


export function millToDate(mills) {
    var date = new Date(mills)
    if (date.getFullYear()) {
        return date.getFullYear() + "-" +
            ((date.getMonth() + 1 ) > 9 ? (date.getMonth() + 1 ) : ('0' + (date.getMonth() + 1 ))) + "-" +
            (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate()))
    }
}


export function getQueryString(name, isEmpty) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return isEmpty ? '' : null;
}
