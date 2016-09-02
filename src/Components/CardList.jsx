import React from 'react';
import Card from './Card.jsx';
class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    render() {
        let fileList = this.state.list.map((item, index) => {
            return (<Card/>)
        });
        return (
            <div className="wu-cardlist">
                {fileList}
                <button>Add</button>
            </div>
        );
    }
}
