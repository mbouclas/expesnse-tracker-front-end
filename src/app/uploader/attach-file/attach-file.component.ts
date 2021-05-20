import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {IFileToUpload, IOnUploadResponse, UploaderService} from '../uploader.service';




@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Output() onFileUploaded = new EventEmitter<IOnUploadResponse>();
  @Output() onUploadsComplete = new EventEmitter<boolean>();
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
    });

    this.uploadService.onFileUploaded.subscribe(result => {
      const idx = this.filesToUpload.indexOf(result.file as IFileToUpload);
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
