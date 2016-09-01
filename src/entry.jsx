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
        if (num > 100 || num < 0)
            return;
        this.setState({
            percent: num
        });
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
                    <button onClick={() => this.changeStatus('wu-upload-error', 100)}>error</button>
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
