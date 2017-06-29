import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Detail from './Detail'
import * as d3 from 'd3'
import {
    getFlight
} from '../../action/flight.action'
class Lines extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            base: null,

            card: false,
            cardLoad: true,
            content: '',

            detailKey: 'detail',

            windowPos: []

        }
    }


    changeCard = (card, base, cardLoad) => {
        this.setState({
            card,
            base,
            cardLoad,
            detailKey: this.state.detailKey + 1
        })
    }


    renderLines = () => {
        const {flight} = this.props


        /*创建supermap图层*/
        const elementsLayer = new SuperMap.Layer.Elements("elementsLayer");
        window.map.getInstance().addLayers([elementsLayer]);
        const elementsDiv = elementsLayer.getDiv();
        const myDom = document.createElement("div");
        myDom.class = 'map-container lines';
        myDom.id = 'svg';
        elementsDiv.appendChild(myDom);

        /*创建svg*/
        const svg = d3.select("#svg").append("svg")
        const page = document.getElementsByClassName('flight-page')[0]

        const width = page.clientWidth,
            height = page.clientHeight;

        svg.attr("width", width)
            .attr("height", height)
            .attr('class', 'map-container lines')

        const ecolor = ['#c23531', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#2f4554']

        /*定义filter*/
        const defs = svg.append("defs");

        const shadow = defs.append('filter')
        shadow.attr('id', 'f1')
        shadow.append('feOffset')
            .attr('in', "SourceGraphic")
            .attr('dx', '0')
            .attr('dy', '0')
            .attr('result', 'offOut')

        shadow.append('feGaussianBlur')
            .attr('in', "offOut")
            .attr('stdDeviation', '3')
            .attr('result', 'blurOut')


        shadow.append('feBlend')
            .attr('in', "SourceGraphic")
            .attr('in2', 'blurOut')
            .attr('mode', 'normal')


        const shadow1 = defs.append('filter')
            .attr('id', 'f2')
        shadow1.append('feOffset')
            .attr('in', "SourceGraphic")
            .attr('dx', '10')
            .attr('dy', '0')
            .attr('result', 'offOut')

        shadow1.append('feGaussianBlur')
            .attr('in', "offOut")
            .attr('stdDeviation', '10')
            .attr('result', 'blurOut')


        shadow1.append('feBlend')
            .attr('in', "SourceGraphic")
            .attr('in2', 'blurOut')
            .attr('mode', 'normal')


        // const data = flight.data

        const data = [
            {
                qdjd: 120.69354,
                qdwd: 27.75,
                zdjd: 121.078056,
                zdwd: 27.464821
            }
        ]
        /*将经纬度转换为pixel*/
        function getPix(lnglat) {
            const pixs = window.map.getInstance().getPixelFromLonLat(new SuperMap.LonLat(...lnglat))
            return [pixs.x, pixs.y];
        }

        /*转换为svg path*/
        function getPath(path) {
            const row = path.map(p => getPix(p).join(' '))
            return `M${row.join('L')}`
        }

        const anis = []
        const paths = data.map((d, i) => {
            d.pathData = [[d.qdjd, d.qdwd], [d.zdjd, d.zdwd]]
            const path = svg.append('path')
            path.attr("stroke-width", 3)
                .attr('stroke', ecolor[i % ecolor.length])
                .attr('class', 'path')
                .attr('fill', 'transparent')
            path.on('mouseover', () => {
                const e = d3.event || {}
                path.attr("stroke-width", 5)
                const content = ( <div>
                    <div>{'温州<-->南麂岛'}</div>
                </div>)
                this.setState({
                    windowPos: [
                        e.pageX + 'px', e.pageY + 'px'
                    ], content
                })
            })

            path.on('mouseout', () => {
                path.attr("stroke-width", 3)
                this.setState({
                    windowPos: ['-10000px', '-10000px'], content: ''
                })
            })
            path.on('click', () => {
                const {dispatch} = this.props
                dispatch(getFlight({}))
                this.changeCard(true, [
                        {field: '航线航班', value: d.hxhb},
                        {field: '开船日期', value: d.kcrq},
                        {field: '船舶名称', value: d.cbmc},
                        {field: '船舶班次', value: d.cbbc},
                        {field: '发船日期', value: d.fcsj},
                        {field: '客位数', value: d.kws},
                        {field: '实际乘坐人数', value: d.sjczrs}
                    ],
                    false)
            })

            const mycircle = svg.append("circle")
            mycircle.attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 3)
                .attr('fill', ecolor[i % ecolor.length])
                .attr('filter', 'url(#f2)');

            // const ani = mycircle.append('animateMotion')
            // ani.attr('path', getPath(d.pathData))
            //     .attr('begin', 0)
            //     .attr('dur', '5s')
            //     .attr('repeatCount', 'indefinite')


            // anis.push(ani)
            return path
        })


        function render() {
            paths.forEach((path, i) => {
                path.attr("d", getPath(data[i].pathData));
                // anis[i].attr('path', getPath(data[i].pathData))
            })
        }

        render()

        function reve() {
            paths.forEach(path => path.attr("d", ''))
            // anis.forEach(path => path.attr("path", ''))
        }

        window.map.getInstance().events.register('movestart', window.map.getInstance(), reve);
        window.map.getInstance().events.register('moveend', window.map.getInstance(), render);
    }


    componentDidMount() {
        const iter = setInterval(() => {
            if (window.map) {
                clearInterval(iter)
                this.renderLines()
            }
        }, 100)
    }

    render() {
        const {card, base, cardLoad} = this.state
        return (
            <div>
                <Detail changeCard={this.changeCard} show={card} base={base} load={cardLoad}
                        key={this.state.detailKey}/>
                <div className='window-pop' style={{left: this.state.windowPos[0], top: this.state.windowPos[1]}}>
                    <div className="pop-content">
                        {this.state.content}
                    </div>
                    <div className="caret">
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({flight}) {
    return {flight}
}
export default connect(mapStateToProps)(Lines)