import React from 'react';
import {render} from 'react-dom';
import Card from './Components/Card.jsx';
import 'expose?$!expose?jQuery!jquery';
import './base.scss';
import WebUploader from './vendor/webuploader.html5only.js';
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
            let initfiles = files.map(file => {
                this.setState({[file.id] : 0});
                return new Promise((resolve, reject) => {
                    this.WU.makeThumb(file, (error, ret) => {
                        if (error) {
                            file.preview = false;
                        } else {
                            file.preview = ret;
                        }
                        resolve();
                    }, 192, 200);
                });
            });
            Promise.all(initfiles).then(()=>{
                let newList = this.state.fileList.concat(files);
                this.setState({fileList: newList});
            });
        });
        this.WU.on('uploadProgress', (file, percentage) => {
            this.setState({[file.id]: percentage});
        });
        this.WU.on('uploadSuccess', file => {
            console.log(file.name, ':已上传');
            console.log(file.getStatus());
        });
        this.WU.on('uploadError', file => {
            console.log(file.name, ':上传出错');
        });
        this.WU.on('uploadComplete', file => {
            this.updateQueue();
        });
    }
    render() {
        return (
            <div>
                <div className="wu-card-list">
                    {
                        this.state.fileList.map(file => {
                            return (
                                <Card type="square" status={file.getStatus()} percent={this.state[file.id]} key={file.id}>
                                    {file.preview ? <img src={file.preview}/>: null}
                                    <p>{file.name}</p>
                                    <p>{WebUploader.Base.formatSize(file.size)}</p>
                                    <span className="wu-card-remover" onClick={() => {this.removeFile(file)}}>x</span>
                                </Card>
                            )
                        })
                    }
                    <Card status={this.state.status} percent={null} className="wu-fileAdd" onClick={() => this.addNewFile()}>
                        <span id="pick">Add</span>
                        <span className="wu-add-icon">+</span>
                    </Card>
                </div>
            </div>
        );
    }
}
render((<App/>), document.getElementById('app'));
