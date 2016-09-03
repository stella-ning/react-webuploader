import React from 'react';
import Card from './Card.jsx';
class CardList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {cardList, ...others} = this.props;
        return (
            <div className="wu-card-list">
                {cardList.map((element, index)=>(<Card {...element} key={index}></Card>))}
                {this.props.children}
            </div>
        );
    }
}
export default CardList;
