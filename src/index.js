import React from 'react';

export default class XHRUploader extends React.Component {

  static get propTypes() {
    return {
      url: React.PropTypes.string.isRequired,
      fieldName: React.PropTypes.string,
      buttonLabel: React.PropTypes.string,
      accept: React.PropTypes.string,
      chunks: React.PropTypes.bool,
      chunkSize: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      fieldName: 'datafile',
      buttonLabel: 'Upload',
      accept: 'image/*',
      chunks: false,
      chunkSize: 512 * 1024
    };
  }

  constructor(props) {
    super(props);
    this.state = {items: []};
    this.xhrs = [];
  }

  onClick() {
    this.refs.fileInput.click();
  }

  onFileSelect() {
    const items = this.filesToItems(this.refs.fileInput.files);
    this.setState({items: items}, () => {
        this.upload();
    });
  }

  upload() {
    const items = this.state.items;
    if(items) {
      items.filter(item => !item.cancelled).forEach((item) => {
        this.uploadItem(item);
      });
    }
  }

  uploadItem(item) {
    if(this.props.chunks) {
      const BYTES_PER_CHUNK = this.props.chunkSize;
      const SIZE = item.file.size;

      let start = 0;
      let end = BYTES_PER_CHUNK;

      let chunkIndex = 0;
      while(start < SIZE) {
        this.uploadChunk(item.file.slice(start, end), chunkIndex++, item.file.name);
        start = end;
        end = start + BYTES_PER_CHUNK;
      }
    } else {
      this.uploadFile(item.file);
    }
  }

  uploadChunk(blob, chunkIndex, fileName) {
    if(blob) {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append(this.props.fieldName, blob, `${fileName}-chunk${chunkIndex}`);

      xhr.open('POST', this.props.url, true);
      xhr.send(formData);
    }
  }

  uploadFile(file) {
    if(file) {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append(this.props.fieldName, file, file.name);

      xhr.open('POST', this.props.url, true);
      xhr.send(formData);
      this.xhrs[file.index] = xhr;
    }
  }

  filesToItems(files) {
    const fileItems = Array.prototype.slice.call(files).slice(0, this.props.maxFiles);
    const items = fileItems.map((f, i) => {
      if(this.props.chunks) {
        const chunkProgress = [];
        for(let j = 0; j <= f.size / this.props.chunkSize; j++) {
          chunkProgress.push(0);
        }
        return {file: f, index: i, progress: 0, cancelled: false, chunkProgress: chunkProgress};
      }
      return {file: f, index: i, progress: 0, cancelled: false};
    });
    return items;
  }

  renderButton() {
    return <button onClick={() => this.onClick()}>{this.props.buttonLabel}</button>;
  }

  renderInput() {
    return <input style={{display: 'none'}} accept={this.props.accept} type="file" ref="fileInput" onChange={() => this.onFileSelect()}/>;
  }

  render() {
    return (
      <div>
        {this.renderButton()}
        {this.renderInput()}
      </div>
    );
  }
}
