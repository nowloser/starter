import React, {Component} from 'react'
import classnames from 'classnames'

class Kind extends Component {
    constructor(props, context) {
        super(props, context)
    }


    render() {
        const {sels, row, onClick, current} = this.props
        return (
            <div className="res-kind-sel">
                {sels.map((sel, i) => (
                    <div key={'kind' + i} className={"res-select le" + row + ' ' + (i === current?'active':'')}
                         onClick={onClick.bind(this, i)}>
                        {sel}
                    </div>)
                )}
            </div>
        )


    }
}

export default Kind