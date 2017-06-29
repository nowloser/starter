/**
 * Created by xiangfahai on 2016/12/27.
 */
import warning from './warning'
export default function (map, setting) {
    return function addWindow(config, isAdd) {
        if (!config) {
            warning('参数错误')
            return
        }
        const events = {}

        const {position, content, size, autoClose} = config
        const infoWindow = new SuperMap.Popup("chicken",
            new SuperMap.LonLat(...position),
            new SuperMap.Size(1, 1),
            content,
            autoClose);

        infoWindow.autoSize = true

        if (isAdd !== false) {
            map.addPopup(infoWindow);
        }


        /**
         * 添加一个事件
         * */

        const addListener = function (type, event) {
            return this
        }

        /**
         * 移除一个事件
         * */

        const removeListener = function (type) {
            return this
        }


        /**
         * 获取自定义数据
         * */

        const getData = function () {
            return config.data
        }
        /**
         * 修改自定义数据
         * */
        const setData = function (data) {
            config.data = data
            return this
        }


        /**
         * 获取信息窗体位置
         * */
        const getPosition = function () {
            return config.position
        }

        /**
         * 设置信息窗体位置
         * */
        const setPosition = function (position) {
            config.position = position
            infoWindow.lonlat = {lon: config.position[0], lat: config.position[1]}
            infoWindow.updatePosition()
            return this
        }

        /**
         * 获取内容
         * */
        const getContent = function () {
        }
        /**
         * 设置内容
         * */
        const setContent = function (content) {
            config.content = content
            infoWindow.setContentHTML(content)
            infoWindow.updatePosition()
            infoWindow.updateSize()
            return this
        }

        /**
         * 移除
         * */
        const close = function () {
            infoWindow.hide()
            return this
        }


        /**
         * 显示信息窗体
         * */
        const open = function (position) {
            if (position) {
                config.position = position
            }
            return this
        }


        /**
         * 显示信息窗体
         * */
        const setOpen = function (open) {
            config.open = open
            if (open) {
                infoWindow.show()
            } else {
                infoWindow.hide()
            }
            return this
        }


        return {
            getInstance: infoWindow,
            getData,
            setData,
            close,
            open,
            setContent,
            getContent,
            setPosition,
            getPosition,
            addListener,
            removeListener,
            setOpen
        }
    }
}