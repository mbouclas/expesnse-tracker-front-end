import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGenericObject, IPagination, ISuccessResponse} from '../models/generic';
import {environment} from '../../environments/environment';
import {ExpenseModel, IExpense} from '../models/expense.model';
import {createFilterUrl} from '../helpers/serializers';

export interface IExpenseFilters {
}

export interface IGroupedData {
  instances: number;
  total: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
      private http: HttpClient,
  ) { }

  async find(filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<IPagination<IExpense>>(createFilterUrl(`${environment.API_ENDPOINT}expense`, filters)).toPromise();

  }

  async store(model: IExpense) {
    return await this.http.post<IExpense>(`${environment.API_ENDPOINT}expense`, model).toPromise();
  }

  async findOne(id: number, filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<ExpenseModel>(createFilterUrl(`${environment.API_ENDPOINT}expense/${id}`, filters)).toPromise();
  }

  async update(item: ExpenseModel) {
    return await this.http.patch<ExpenseModel>(`${environment.API_ENDPOINT}expense/${item.id}`, item).toPromise();
  }

  async delete(id: number) {
    return await this.http.delete<ISuccessResponse>(`${environment.API_ENDPOINT}expense/${id}`).toPromise();
  }

  async groupByVendor() {
    return this.http.get<IGroupedData[]>(`${environment.API_ENDPOINT}expense/group-by-vendor`).toPromise();
  }

  async groupByType() {
    return this.http.get<IGroupedData[]>(`${environment.API_ENDPOINT}expense/group-by-type`).toPromise();
  }
}
