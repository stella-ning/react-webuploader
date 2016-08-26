import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Cards = [1,2,3,4,5].map((e, i) => <Card key={i}/>);
        return (
            <div>
                <h1>Title</h1>
                {Cards}
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
