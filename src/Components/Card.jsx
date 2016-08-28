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
            bgWidth = parseInt(198),
            bgHeight = parseInt(348);

        let strokeWidth = 3;
        let pathD = `M 0 0 L ${bgWidth} 0 L ${bgWidth} ${bgHeight} L 0 ${bgHeight} z`;
        let path = (<path d={pathD} fill="orange" stroke="black" strokeWidth={strokeWidth}/>);

        let svg = (
            <svg className="wu-card-bg" xmlns="http://www.w3.org/2000/svg" height={bgHeight} width={bgWidth}>
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
            <div className="wu-card-box" ref="cardElement">
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
