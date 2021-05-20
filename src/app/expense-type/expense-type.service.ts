import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGenericObject, IPagination, ISuccessResponse} from '../models/generic';
import {createFilterUrl} from '../helpers/serializers';
import {environment} from '../../environments/environment';
import {IExpenseFilters} from '../expense/expense.service';
import {ExpenseTypeModel, IExpenseType} from '../models/expense-type.model';


@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {

  constructor(private http: HttpClient) { }

  async find(filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<IPagination<IExpenseType>>(createFilterUrl(`${environment.API_ENDPOINT}expense-type`, filters)).toPromise();

  }

  async store(model: IExpenseType) {
    return await this.http.post<ExpenseTypeModel>(`${environment.API_ENDPOINT}expense-type`, model).toPromise();
  }

  async findOne(id: number, filters: IGenericObject<IExpenseFilters> = {}) {
    return this.http.get<ExpenseTypeModel>(createFilterUrl(`${environment.API_ENDPOINT}expense-type/${id}`, filters)).toPromise();
  }

  async update(item: ExpenseTypeModel) {
    return await this.http.patch<ExpenseTypeModel>(`${environment.API_ENDPOINT}expense-type/${item.id}`, item).toPromise();
  }

  async delete(id: number) {
    return await this.http.delete<ISuccessResponse>(`${environment.API_ENDPOINT}expense-type/${id}`).toPromise();
  }
}
