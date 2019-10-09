import React,{Component} from 'react';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
    }
    
    onChange = (e) => {
      console.log(e.target.files[0])
      this.setState({file:e.target.files[0]});
    }

    onClick = async (e) => {
      const data = new FormData();
      data.append('file', this.state.file);

      fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        console.log(response)
      });

    }

    render() {
        return (
          <div>
            <h1>File Upload</h1>
            <input type="file" name="myImage" onChange= {this.onChange} />
            <button className="btn btn-primary" onClick={this.onClick}>Upload</button>
          </div>
        )
    }
}