import React from 'react';
import ReactDOM from 'react-dom';
class Card extends React.Component {
    static defaultProps = {
        type: 'line',
        status: ''
    };
    static propTypes = {
        // status: React.PropTypes.oneOf(['', 'wu-upload-progress', 'wu-upload-error', 'wu-upload-success'])
    }

    constructor(props) {
        super(props);
        let r = 4;
        let gap = 2;
        const x = 200,
            y = 320;
        this.state = {
            svg: null,
            progress: null,
            pathD: [
                `M ${gap + r} ${gap}`,
                `H ${x - gap - r}`,
                `Q ${x - gap} ${gap},${x - gap} ${gap + r}`,
                `V ${y - gap - r}`,
                `Q ${x - gap} ${y - gap},${x - gap - r} ${y - gap}`,
                `H ${gap + r}`,
                `Q ${gap} ${y - gap},${gap} ${y - gap - r}`,
                `V ${gap + r}`,
                `Q ${gap} ${gap},${gap + r} ${gap}`,
                `z`
            ].join(' ')
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(){
        if(this.props.percent === null) return;
        let path = ReactDOM.findDOMNode(this._path);
        let totalLen = Math.round(path.getTotalLength());
        let offset = totalLen*(1 - this.props.percent);
        let dash = totalLen;
        let style = `stroke-dasharray:${totalLen},${totalLen};stroke-dashoffset:${offset}`;
        path.style = style;
    }
    render() {
        let {title, status, percent, ...others} = this.props;
        const header = title
            ? <div className="wu-card-header">{title}</div>
            : null;
        return (
            <div className={`wu-card-box wu-upload-${status}`} ref={c => this._elementRef = c} {...others}>
                {header}
                <Svg x={200} y={320}>
                    <Path d={this.state.pathD} className="wu-card-progressbg" key="1"></Path>
                    <Path d={this.state.pathD} className="wu-card-border" key="2" ref={c => this._path = c}></Path>
                </Svg>
                <div className="wu-card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
class Svg extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className="wu-card-bg" xmlns="http://www.w3.org/2000/svg" height={this.props.y} width={this.props.x} ref="svgElement">
                {this.props.children}
            </svg>
        );
    }
}
class Path extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<path d={this.props.d} className={this.props.className}/>);
    }
}
export default Card;
