export const OverlayMixin = {
    bindEvent(overlay, event = {}, nowEvent = {}) {
        //重新注册事件
        const eventKeys = Object.keys(event)//新的事件
        const nowEventKeys = Object.keys(nowEvent)//当前事件

        nowEventKeys.forEach(function (type) {
            if (!event[type]) {
                overlay.removeListener(type)
            }
        })

        eventKeys.forEach(function (type) {
            if (nowEvent[type] !== event[type]) {
                overlay.removeListener(type)
                overlay.addListener(type, event[type])
            }
        })
    }
};
