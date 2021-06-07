import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';
import {ExpenseService, IGroupedData} from '../../expense/expense.service';
export interface IChartData {
  name: string;
  value: number|string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select('isHandset') isHandset$: Observable<boolean>;
  public isHandset = false;
  protected _subscriptions :any[] = [];
  vendorData: IChartData[] = [];
  expenseTypeData: IChartData[] = [];
  view: any[] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
      private service: ExpenseService,
  ) {

  }

  async ngOnInit() {
    this._subscriptions.push(this.isHandset$.subscribe(isIt => this.isHandset = isIt));
    const expenseTypeData = await this.service.groupByType();
    this.expenseTypeData = expenseTypeData.map(item => {
      return {
        name: item.title,
        value: item.total,
      }
    });

    const vendorData = await this.service.groupByVendor();
    this.vendorData = vendorData.map(item => {
      return {
        name: item.title,
        value: item.total,
      }
    });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
