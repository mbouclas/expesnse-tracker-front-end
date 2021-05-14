import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {IFileToUpload, UploaderService} from '../uploader.service';

export interface IFileUploadResult {
  file: File;
  success: boolean;
}



@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Output() onFileUploaded = new EventEmitter<IFileUploadResult>();
  @Output() onUploadsComplete = new EventEmitter<boolean>();

  uploadEndPoint = `${environment.API_ENDPOINT}uploads/file`;
  httpRequestHeaders = {
    'X-JWT-Token': `${AuthService.currentUser().token}`
  };
  filesToUpload: IFileToUpload[] = [];
  uploadUnderWay = false;

  constructor(
      private uploadService: UploaderService,
  ) { }

  ngOnInit(): void {
  }

  openUploader() {

  }


  onFilesSelected(files: FileList) {
    this.addFilesToUploadList(files);
    this.uploadService.uploadMany(files);
    this.uploadUnderWay = true;
    this.uploadService.onProgress.subscribe((progress) => {
      const idx = this.filesToUpload.indexOf(progress.file as any);
      this.filesToUpload[idx].progress = progress.progressPercentage;
      console.log(idx, progress.total, progress.loaded, `${progress.progressPercentage}%`);
    });

    this.uploadService.onFileUploaded.subscribe(result => {
      const idx = this.filesToUpload.indexOf(result.file);
      this.filesToUpload.splice(idx, 1);
      this.onFileUploaded.emit(result);

      if (this.filesToUpload.length === 0 && this.uploadUnderWay) {
        this.onUploadsComplete.emit(true);
        this.uploadUnderWay = false;
      }
    })
  }

  private addFilesToUploadList(files: FileList) {
    for (let idx = 0; files.length > idx; idx++) {
      this.filesToUpload.push(files[idx] as any);
    }

    return this;
  }
}
