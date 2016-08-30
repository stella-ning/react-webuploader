import React from 'react';
class Card extends React.Component {
    static defaultProps = {
        type: 'line',
        status: ''
    };
    constructor(props) {
        super(props);
        let r = 4;
        let gap = 2;
        const x = parseInt(200),
            y = parseInt(320);
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
        this.setProgress = this.setProgress.bind(this);
    }
    componentDidMount() {
        const self = this.refs.cardElement;
        console.log(self);
    }
    setProgress(num) {
        const self = this.refs.cardElement;
        self.querySelectorAll('.wu-card-border').forEach(ele => {
            console.log(ele.refs);
        });
        console.log(this.props);
    }
    render() {
        let {title} = this.props;
        const header = title
            ? <div className="wu-card-header">{title}</div>
            : null;
        return (
            <div className={`wu-card-box ${this.props.status}`} ref="cardElement" onClick={this.setProgress}>
                {header}
                <Svg x={200} y={320}>
                    <Path d={this.state.pathD} className="wu-card-progressbg" key="1"></Path>
                    <Path d={this.state.pathD} className="wu-card-border" key="2"></Path>
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
    componentDidMount() {}
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
    componentDidMount() {}
    setStrokeDasharray() {
        const self = this.refs.pathElement;
        const TOTAL_LENGTH = self.getTotalLength();
        self.style.strokeDasharray = TOTAL_LENGTH;
        console.log(TOTAL_LENGTH);
    }
    render() {
        return (<path d={this.props.d} className={this.props.className} ref="pathElement"/>);
    }
}
export default Card;
