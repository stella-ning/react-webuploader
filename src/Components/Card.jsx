import React from 'react';
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            svg: null,
            progress: 0
        };
    }
    componentDidMount() {
        const self = this.refs.cardElement,
            x = parseInt(200),
            y = parseInt(320);
        let r = 4;
        let gap = 2;
        let pathD = [
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
        ].join(' ');
        let path = (<path d={pathD} className="wu-card-border"/>);
        let svg = (
            <svg className="wu-card-bg" xmlns="http://www.w3.org/2000/svg" height={y} width={x}>
                {path}
            </svg>
        );
        this.setState({svg: svg});
    }
    setProgress(num) {
        this.setState({progress: num});
    }
    render() {
        let {title} = this.props;
        const header = title
            ? <div className="wu-card-header">{title}</div>
            : null;
        return (
            <div className={`wu-card-box ${this.props.status || ''}`} ref="cardElement">
                {this.state.svg}
                {header}
                <div className="wu-card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Card;
