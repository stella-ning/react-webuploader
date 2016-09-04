import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import 'expose?$!expose?jQuery!jquery';
import WebUploader from './vendor/webuploader.html5only.js';
import './base.scss';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            fileList: []
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.addNewFile = this.addNewFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.updateQueue = this.updateQueue.bind(this);
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
        document.querySelector('#pick input').click();
    }
    removeFile(file){
        this.WU.removeFile(file);
        this.updateQueue();
    }
    updateQueue(){
        let newList = this.WU.getFiles.apply(this.WU, ['queued', 'progress', 'complete', 'error']);
        console.log(newList);
        this.setState({fileList : newList});
    }
    componentDidMount() {
        this.WU = new WebUploader.create({server: 'http://localhost/test.php/Home/Index/upload', pick: '#pick', auto: true});
        this.WU.on('filesQueued', files => {
            files.forEach(file=>{
                this.setState({[file.id] : 0});
            });
            let newList = this.state.fileList.concat(files);
            this.setState({fileList: newList});
        });
        this.WU.on('uploadProgress', (file, percentage) => {
            this.setState({[file.id]: percentage});
        });
        this.WU.on('uploadSuccess', file => {
            console.log(file.name, ':已上传');
            console.log(file.getStatus());
            this.updateQueue();
        });
        this.WU.on('uploadError', file => {
            console.log(file.name, ':上传出错');
        });
        this.WU.on('uploadComplete', file => {
            console.log(file.name, ':上传完成');
        });
    }
    render() {
        return (
            <div>
                <div className="wu-card-list">
                    {
                        this.state.fileList.map(file => {
                            return (
                                <Card status={file.getStatus()} percent={this.state[file.id]} key={file.id} onClick={() => {this.removeFile(file)}}>
                                    <p>{file.name}</p>
                                    <p>{file.size}</p>
                                    <p>{file.type}</p>
                                </Card>
                            )
                        })
                    }
                    <Card status={this.state.status} percent={null} className="wu-fileAdd" onClick={() => this.addNewFile()}>
                        <span id="pick">Add</span>
                    </Card>
                </div>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
