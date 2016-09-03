import React from 'react';
import {render} from 'react-dom';
import 'expose?$!expose?jQuery!jquery';
import WebUploader from './vendor/webuploader.html5only.js';
import Card from './Components/Card.jsx';
import CardList from './Components/CardList.jsx';
import './base.scss';
class App extends React.Component {
    static WU = null;
    static config = {
        server: 'http://webuploader.duapp.com/server/fileupload.php',
        pick: '#pick'
    };
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
        console.log(this.config);
        this.WU = this.WU || new WebUploader.create(this.config);
        console.log($('#pick'));
        console.log(this.WU);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <CardList cardList={this.state.fileList}>
                    <Card status={this.state.status} percent={this.state.percent} className="wu-fileAdd" onClick={() => this.addNewFile()}><span id="pick"></span></Card>
                </CardList>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
