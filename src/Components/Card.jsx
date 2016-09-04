import React from 'react';
import ReactDOM from 'react-dom';
class Card extends React.Component {
    static defaultProps = {
        gap: 2,
        r: 4,
        status: '',
        type: 'round',
        x: 200,
        y: 320
    };
    static propTypes = {
        // status: React.PropTypes.oneOf(['', 'wu-upload-progress', 'wu-upload-error', 'wu-upload-success'])
        type: React.PropTypes.oneOf(['round', 'square'])
    }

    constructor(props) {
        super(props);
        const {x, y, gap, r} = this.props
        this.state = {
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
            ].join(' '),
            pathTop: [
                `M ${gap + r} ${gap}`,
                `H ${x - gap - r}`,
                `Q ${x - gap} ${gap},${x - gap} ${gap + r}`,
            ].join(''),
            pathRight: [
                `M ${x - gap} ${gap + r}`,
                `V ${y - gap - r}`,
                `Q ${x - gap} ${y - gap},${x - gap - r} ${y - gap}`
            ].join(''),
            pathBottom: [
                `M ${x - gap - r} ${y - gap}`,
                `H ${gap + r}`,
                `Q ${gap} ${y - gap},${gap} ${y - gap - r}`
            ].join(''),
            pathLeft: [
                `M ${gap} ${y - gap - r}`,
                `V ${gap + r}`,
                `Q ${gap} ${gap},${gap + r} ${gap}`
            ].join('')
        };
    }
    componentDidMount() {

    }
    componentDidUpdate(){
        if(this.props.percent === null) return;
        this.svgElement.querySelectorAll('.wu-card-border').forEach(ref => {
            let path = ReactDOM.findDOMNode(ref);
            let totalLen = Math.round(path.getTotalLength());
            let offset = totalLen * (1 - this.props.percent);
            let dash = totalLen;
            let style = `stroke-dasharray:${totalLen},${totalLen};stroke-dashoffset:${offset};transition:stroke-dashoffset 1s`;
            path.style = style;
        });
    }
    render() {
        let {title, status, percent, type, x, y, gap, ...others} = this.props;
        let path = null;
        if(type === 'round'){
            path = (<path d={this.state.pathD} className="wu-card-border" />);
        } else if (type === 'square') {
            path = [
                <path d={this.state.pathTop} className="wu-card-border" key="top" />,
                <path d={this.state.pathRight} className="wu-card-border" key="right" />,
                <path d={this.state.pathBottom} className="wu-card-border" key="bottom" />,
                <path d={this.state.pathLeft} className="wu-card-border" key="left" />
            ];

        }
        const header = title
            ? <div className="wu-card-header">{title}</div>
            : null;
        return (
            <div className={`wu-card-box wu-upload-${status}`} ref={c => this._elementRef = c} {...others}>
                {header}
                <svg className="wu-card-bg" xmlns="http://www.w3.org/2000/svg" height={y} width={x} ref = {c => this.svgElement = c}>
                    <path d={this.state.pathD}  className="wu-card-progressbg"/>
                    {path}
                </svg>
                <div className="wu-card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Card;
