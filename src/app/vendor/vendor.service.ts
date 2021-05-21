import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGenericObject, IPagination, ISuccessResponse} from '../models/generic';
import {IExpenseFilters} from '../expense/expense.service';
import {createFilterUrl} from '../helpers/serializers';
import {environment} from '../../environments/environment';
import {IVendor, VendorModel} from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  async find(filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<IPagination<IVendor>>(createFilterUrl(`${environment.API_ENDPOINT}vendor`, filters)).toPromise();

  }

  async store(model: IVendor) {
    return await this.http.post<VendorModel>(`${environment.API_ENDPOINT}vendor`, model).toPromise();
  }

  async findOne(id: number, filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<VendorModel>(createFilterUrl(`${environment.API_ENDPOINT}vendor/${id}`, filters)).toPromise();
  }

  async update(item: VendorModel) {
    return await this.http.patch<VendorModel>(`${environment.API_ENDPOINT}vendor/${item.id}`, item).toPromise();
  }

  async delete(id: number) {
    return await this.http.delete<ISuccessResponse>(`${environment.API_ENDPOINT}vendor/${id}`).toPromise();
  }
}
