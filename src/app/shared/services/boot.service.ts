import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {createFilterUrl} from '../../helpers/serializers';
import {environment} from '../../../environments/environment';
import {IExpenseType} from '../../models/expense-type.model';
import {IVendor} from '../../models/vendor.model';
import {AppService} from './app.service';

export interface IBootResult {
    expenseTypes: IExpenseType[];
    vendors: IVendor[]
}

@Injectable({providedIn: 'root'})
export class BootService {
    constructor(private http: HttpClient) {
    }

    async boot() {
        const res = this.http.get<IBootResult>(createFilterUrl(`${environment.API_ENDPOINT}boot`, {})).toPromise();
        AppService.stateRefreshed.emit(true);

        return res;
    }

}
