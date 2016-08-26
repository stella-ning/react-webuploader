import React from 'react';
import {render} from 'react-dom';
import './Components/base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>Demo test</div>
        );
    }
}
render((<App/>), document.getElementById('app'));
