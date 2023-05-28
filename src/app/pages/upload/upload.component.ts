import { Component, OnInit } from '@angular/core';
declare var require: any

require('aws-sdk/dist/aws-sdk');

import { Data } from '@angular/router';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFiles: any;

  constructor() { }

  fileEvent(fileInput: []) {
    Object.values(fileInput).forEach((file: any) => {
      let AWSService = window.AWS;
      console.log(AWSService)
      AWSService.config.accessKeyId = '';
      AWSService.config.secretAccessKey = '';
      let bucket = new AWSService.S3({params: {Bucket: 'bucketname'}});
      let params = {Key: file.name, Body: file};
      bucket.upload(params, function(error: any, res: any) {
      console.log('error', error);
      console.log('response', res);
      })
    })
  }

  ngOnInit(): void {
  }

  uploadMultipleFiles(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload(event: any) {
    this.fileEvent(this.selectedFiles);
  }

  // reset(event: any) {

  // }

}
