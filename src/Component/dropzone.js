import React, { Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csv";

export default class DropZoneS extends Component {

  render() {
    return (
      <div className="dropZoneContainer">
        <Dropzone
          onDrop={acceptedFiles => {
            const reader = new FileReader();
            reader.onload = () => {
              csv.parse(reader.result, (err, data) => {
                this.props.handleData(data)
              });
            };
            reader.readAsBinaryString(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="dragStyle">Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}
