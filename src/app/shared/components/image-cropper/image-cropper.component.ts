import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Platform } from '@angular/cdk/platform';
import { RequestService } from 'src/app/shared/services/request.service';
@Component({
  selector: 'share-image-cropper',
  templateUrl: './image-cropper.component.html',
})
export class ImageCropComponent {
  constructor(
    private requestService: RequestService
  ){


    }
  title = 'angular-image-uploader';
  currentImgUrl: any;
    imageChangedEvent: any = '';
    croppedImage: any = '';
   
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
      
       console.log('image load');
    }
    cropperReady(eventArgs: any) {
      
      
    }
    crop(){
      console.log('image load cropper');
      this.uploadImage(this.croppedImage);
    }
    loadImageFailed() {
      console.log('fails image load cropper');
    }
    uploadImage(baseImg){
      const file = this.DataURIToBlob(baseImg);
      const formData = new FormData();
      formData.append('upload', file, 'image.jpg')
      formData.append('path', 'temp/') //other param
      this.requestService.sendRequest('user/upload-profile-image/add', 'post', formData).subscribe(res => {
        if (res && res.status) {
          if (res.result.data) {
            console.log('image uploaded successfully');
          }
        }else {
         console.log('error image loaded');
        }
      }, error => {
        console.log("Images compontent -> submit -> error", error);
    
      });
    }
    DataURIToBlob(dataURI: string) {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)
          return new Blob([ia], { type: mimeString })
    }
}
