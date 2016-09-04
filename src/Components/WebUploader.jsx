import React from 'react';
import Card from './Card.jsx';
import 'expose?$!expose?jQuery!jquery';
import webu from '../vendor/webuploader.html5only.js';
class WebUploader extends React.Component {
    static propTypes = {
        uploaderConfig : React.PropTypes.shape({server: React.PropTypes.string, pick: React.PropTypes.any.isRequired})
    }
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
        this.addNewFile = this.addNewFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.updateQueue = this.updateQueue.bind(this);
    }
    addNewFile() {
        document.querySelector(`${this.props.uploaderConfig.pick} input`).click();
    }
    removeFile(file){
        this.WU.removeFile(file);
        this.updateQueue();
    }
    updateQueue(){
        let newList = this.WU.getFiles.apply(this.WU, ['queued', 'progress', 'complete', 'error']);
        this.setState({fileList : newList});
    }
    componentDidMount() {
        this.WU = new webu.create(this.props.uploaderConfig);
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
        this.WU.on('uploadComplete', file => {
            this.updateQueue();
        });
    }
    render(){
        return (
            <div className="wu-card-list">
                {this.state.fileList.map(file => {
                    return (
                        <Card status={file.getStatus()} percent={this.state[file.id]} key={file.id} {...this.props.styleConfig}>
                            {file.preview? <img src={file.preview}/>: null}
                            <p>{file.name}</p>
                            <p>{webu.Base.formatSize(file.size)}</p>
                            <span className="wu-card-remover" onClick={() => {this.removeFile(file)}}>x</span>
                        </Card>
                    );
                })}
                <Card className="wu-fileAdd" onClick={() => this.addNewFile()}>
                    <span id={`${this.props.uploaderConfig.pick.slice(1)}`}></span>
                    <span className="wu-add-icon">+</span>
                </Card>
            </div>
        );
    }
}
export default WebUploader;
