import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGenericObject, IPagination} from '../models/generic';
import {environment} from '../../environments/environment';
import {ExpenseModel, IExpense} from '../models/expense.model';
import {createFilterUrl} from '../helpers/serializers';

export interface IExpenseFilters {
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
}
