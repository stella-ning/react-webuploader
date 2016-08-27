import React from 'react';
class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {title, extra} = this.props;
        const header = title
            ? <div className="wu-card-header">{title}</div>
            : null;
        return (
            <div className="wu-card-box">
                {header}
                <div className="wu-card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Card;
