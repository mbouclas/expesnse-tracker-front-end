import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface IExportResult {
  zipFileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
      private http: HttpClient,
  ) { }

  async export(id: number) {
    return await this.http.get(`${environment.API_ENDPOINT}export/${id}`).toPromise();
  }

  async exportMany(ids: number[]) {
    return await this.http.post<IExportResult>(`${environment.API_ENDPOINT}export`, ids).toPromise();
  }
}
