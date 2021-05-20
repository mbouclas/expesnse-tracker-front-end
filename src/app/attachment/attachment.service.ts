import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ISuccessResponse} from '../models/generic';
import {IAttachment} from '../models/attachment.model';

export interface IBase64ImageUploadResponse {
  fileName: string;
  fileType: {
    ext: string;
    mime: string;
    type: "image";
  }
}

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  async saveBase64ToFile(base64String: string, type) {
    return await this.http.post<IBase64ImageUploadResponse>(`${environment.API_ENDPOINT}uploads/base64`, {base64String, type}).toPromise();
  }

  async delete(id: number) {
    return await this.http.delete<ISuccessResponse>(`${environment.API_ENDPOINT}attachment/${id}`).toPromise();
  }

  async downloadFile(attachment: IAttachment) {
    return await this.http.get<string>(`${environment.API_ENDPOINT}attachment/download/${attachment.id}`).toPromise();
  }

  async getImageUrl(id: number) {
    return await this.http.get<string>(`${environment.API_ENDPOINT}attachment/image-url/${id}`).toPromise();
  }
}
