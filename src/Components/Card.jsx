import React from 'react';
class Card extends React.Component {
    static defaultProps = {
        clsPrefix: 'wu-',
        gap: 2,
        percent: 0,
        r: 4,
        status: '',
        type: 'round',
        width: 240
    }

    static propTypes = {
        type: React.PropTypes.oneOf(['round', 'square']),
        gap: React.PropTypes.number,
        r: React.PropTypes.number,
        width: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        const {width, gap, r} = this.props
        const x = width,
              y = x * 1.5;
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
        this.svgElement.querySelectorAll(`.${this.props.clsPrefix}card-border`).forEach(path => {
            let totalLen = Math.round(path.getTotalLength());
            let style = `stroke-dasharray:${totalLen},${totalLen};stroke-dashoffset:${totalLen};transition:unset;`;
            path.style = style;
        });
    }

    componentDidUpdate() {
        this.svgElement.querySelectorAll(`.${this.props.clsPrefix}card-border`).forEach(path => {
            let totalLen = Math.round(path.getTotalLength());
            let offset = totalLen * (1 - this.props.percent);
            let style = `stroke-dasharray:${totalLen},${totalLen};stroke-dashoffset:${offset};`;
            path.style = style;
        });
    }

    render() {
        let {status, percent, type, width, gap, clsPrefix, ...others} = this.props;
        let path = null;
        if(type === 'round'){
            path = (<path d={this.state.pathD} className={`${clsPrefix}card-border`} />);
        } else if (type === 'square') {
            path = [
                <path d={this.state.pathTop} className={`${clsPrefix}card-border`} key="top" />,
                <path d={this.state.pathRight} className={`${clsPrefix}card-border`} key="right" />,
                <path d={this.state.pathBottom} className={`${clsPrefix}card-border`} key="bottom" />,
                <path d={this.state.pathLeft} className={`${clsPrefix}card-border`} key="left" />
            ];
        }
        return (
            <div className={`wu-card-box wu-upload-${status}`} style={{width: width, height: width * 1.5}} {...others}>
                <svg className={`${clsPrefix}card-bg`} ref={c => this.svgElement = c} xmlns="http://www.w3.org/2000/svg">
                    <path d={this.state.pathD}  className={`${clsPrefix}card-progressbg`}/>
                    {path}
                </svg>
                <div className={`${clsPrefix}card-content`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Card;
