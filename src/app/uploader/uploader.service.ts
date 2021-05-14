import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {BehaviorSubject, ReplaySubject, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

export interface IUploadProgress {
  isLoading?: boolean;
  progressPercentage?: number;
  loaded?: number;
  total?: number;
}

export interface IOnUploadProgress {
  isLoading?: boolean;
  progressPercentage?: number;
  loaded?: number;
  total?: number;
  file: File;
  event: Event;
}

export interface IFileToUpload extends File {
  progress: number;
}


@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private uploadProgressSubject = new ReplaySubject<IUploadProgress>();
  uploadProgress$ = this.uploadProgressSubject.asObservable();

  private uploadInProgressSubject = new BehaviorSubject<boolean>(false);
  uploadInProgress$ = this.uploadInProgressSubject.asObservable();
  public onProgress = new EventEmitter<IOnUploadProgress>();
  public onFileUploaded = new EventEmitter();
  public subs = new Subscription();

  constructor(private http: HttpClient) { }

  uploadMany(files: FileList) {
    for (let idx = 0; files.length > idx; idx++) {
      const file = files.item(idx);
      this.subs.add(this.upload(file));
    }

    return this.subs;
  }

  upload(file: File) {
    this.uploadProgressSubject.next({
      progressPercentage: 0,
      loaded: 0,
      total: file.size,
    });

    this.uploadInProgressSubject.next(true);

    let formData = new FormData();
    formData.set('upload', file, file.name);
    return this.http.post(`${environment.API_ENDPOINT}uploads/file`, formData, {
      observe: "events",
      reportProgress: true,
      responseType: "json",
    }).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progressPercentage = Math.floor(
                (event.loaded * 100) / event.total
            );

            this.uploadProgressSubject.next({
              progressPercentage,
              loaded: event.loaded,
              total: event.total,
            });

            this.onProgress.emit({ file: file, event: event, progressPercentage, loaded: event.loaded, total: event.total,});
          }


        },// END SUCCESS
        (error => {
          this.uploadInProgressSubject.next(false);
          this.onFileUploaded.emit({file, success: false});
        }),// END ERROR
        () => {
          this.uploadInProgressSubject.next(false);
          this.onFileUploaded.emit({file, success: true});
        }
    )
  }
}
