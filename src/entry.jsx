import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            percent: null
        }
        this.changeStatus = this.changeStatus.bind(this);
    }
    changeStatus(className, num) {
        if (num !== undefined) {
            this.setPercent(num);
            return setTimeout(() => {
                this.setState({status: className});
            }, 1000);
        }
        this.setState({status: className});
    }
    setPercent(num) {
        console.log(num);
        let currentPercent = this.state.percent;
        if (num > 100 || num < 0) num = Math.floor(Math.abs(num)/100)*100;
        this.setState({percent: num});
    }
    render() {
        return (
            <div>
                <Card status={this.state.status} percent={this.state.percent}>
                    <img  className="wu-card-preview" src="data:image/jpeg;base64,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" alt="example.jpg"/>
                </Card>
                <div className="btn-group">
                    <button onClick={() => this.changeStatus('wu-upload-progress', 1)}>progress</button>
                    <button onClick={() => this.changeStatus('wu-upload-error', 0)}>error</button>
                    <button onClick={() => this.changeStatus('wu-upload-success', 100)}>success</button>
                    <button onClick={() => this.changeStatus('', 0)}>reset</button>
                </div>
                <div className="btn-group">
                    <button onClick={() => this.setPercent(this.state.percent - 10)}>-</button>
                    <button onClick={() => this.setPercent(this.state.percent + 10)}>+</button>
                </div>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
