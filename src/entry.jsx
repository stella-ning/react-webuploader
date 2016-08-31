import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            percent: 0
        }
        this.changeStatus = this.changeStatus.bind(this);
    }
    changeStatus(className) {
        this.setState({status: className});
    }
    setPercent(num){
        let currentPercent = this.state.percent;
        console.log(currentPercent);
        this.setState({percent: currentPercent + num});
    }
    render() {
        return (
            <div>
                <Card title="A simple title" status={this.state.status} percent={this.state.percent}>
                    <p>here is content</p>
                    <p>here is content</p>
                    <p>here is content</p>
                </Card>
                <div className="btn-group">
                    <button onClick={() => this.changeStatus('wu-upload-progress')}>progress</button>
                    <button onClick={() => this.changeStatus('wu-upload-error')}>error</button>
                    <button onClick={() => this.changeStatus('wu-upload-success')}>success</button>
                    <button onClick={() => this.changeStatus('')}>reset</button>
                </div>
                <div className="btn-group">
                    <button onClick={() => this.setPercent(-10)}>-</button>
                    <button onClick={() => this.setPercent(10)}>+</button>
                </div>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
