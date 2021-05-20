import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Camera, CameraDirection, CameraPhoto, CameraResultType, CameraSource} from '@capacitor/core';
import {DomSanitizer} from '@angular/platform-browser';

export interface ICameraSelection {
  image: CameraPhoto,
  preview: string;
}

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  @Output() onSelected = new EventEmitter<ICameraSelection>();
  image: any;
  img: CameraPhoto;
  constructor(
      private domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      correctOrientation: true,
      webUseInput: false,
      direction: CameraDirection.Rear,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.img = image;
    const base64str = `data:image/jpg;base64,${image.base64String}`;


    this.generateFromImage(base64str, 200, 200, 0.5, data => {
      this.image = this.domSanitizer.bypassSecurityTrustUrl(data);
      this.onSelected.emit({
        image,
        preview: this.image,
      });
    });
  }

  generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();

    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(image, 0, 0, width, height);

      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);

      callback(dataUrl)
    }
    image.src = img;
  }

  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
  }

}
