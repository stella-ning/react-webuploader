import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import CardList from './Components/CardList.jsx';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            percent: null,
            fileList: []
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.addNewFile = this.addNewFile.bind(this);
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
            num = Math.floor(Math.abs(num) / 100) * 100;
        this.setState({percent: num});
    }
    addNewFile() {
        let fileListCopy = this.state.fileList.slice();
        fileListCopy.push({status: 'wu-upload-success', percent: null});
        this.setState({fileList: fileListCopy});
    }
    render() {
        return (
            <div>
                <CardList cardList={this.state.fileList}>
                    <Card status={this.state.status} percent={this.state.percent} className="wu-fileAdd" onClick={()=>this.addNewFile()}>NEW</Card>
                </CardList>
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
