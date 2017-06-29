export function setPos(info, content) {
    if (!this || !(typeof this)) {
        console.error('必须指定this')
    }
    const pos = window.map.getInstance().getPixelFromLonLat(new SuperMap.LonLat(info.lon, info.lat))
    this.setState({
        windowPos: [
            pos.x + 'px', pos.y + 'px'
        ],
        content
    })
}

export function clearPos() {
    if (!this || !(typeof this)) {
        console.error('必须指定this')
    }
    this.setState({
        windowPos: ['-10000px', '-10000px']
    })
}