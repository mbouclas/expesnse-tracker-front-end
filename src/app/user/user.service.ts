import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface IUser {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async findOne(id: number) {
    return await this.http.get<IUser>(`${environment.API_ENDPOINT}/user/${id}`).toPromise();
  }
}
