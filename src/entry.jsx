import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Card title="A simple title" key="1" status="wu-upload-progress">
                    <p>here is content</p>
                    <p>here is content</p>
                    <p>here is content</p>
                </Card>
                <Card title="A simple title" key="2" status="wu-upload-error">
                    <p>here is content</p>
                    <p>here is content</p>
                    <p>here is content</p>
                </Card>
                <Card title="A simple title" key="3" status="wu-upload-success">
                    <p>here is content</p>
                    <p>here is content</p>
                    <p>here is content</p>
                </Card>
                <Card title="A simple title" key="4">
                    <p>here is content</p>
                    <p>here is content</p>
                    <p>here is content</p>
                </Card>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
