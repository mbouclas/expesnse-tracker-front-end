import {Component, Input, OnInit, ViewChild, EventEmitter, OnDestroy} from '@angular/core';
import {IExpense} from '../../models/expense.model';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IFilterOptions, IPagination} from '../../models/generic';
import {ExpenseService} from '../expense.service';
import {MatDialog} from '@angular/material/dialog';
import {LoadingDialogComponent} from '../../shared/components/dialogs/loading-dialog/loading-dialog.component';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup} from '@angular/forms';
import findIndex from 'lodash.findindex';
import {ExportService} from '../export.service';
import {AppService} from '../../shared/services/app.service';
import {CustomDatePickerHeaderComponent} from '../../shared/components/custom-date-picker-header/custom-date-picker-header.component';
import {IExpenseType} from '../../models/expense-type.model';
import {IVendor} from '../../models/vendor.model';

export interface IExpenseTableConfig {
}

@Component({
    selector: 'app-expense-table',
    templateUrl: './expense-table.component.html',
    styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
    @Input() tableName = 'Expenses';
    @Select('isHandset') isHandset$: Observable<boolean>;
    @Select('expenseTypes') expenseTypes$: Observable<IExpenseType[]>;
    @Select('vendors') vendors$: Observable<IVendor[]>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) tablePaginator: MatPaginator;
    @Input() data: IPagination<IExpense>;
    @Input() columns: string[] = [];
    @Input() config: IExpenseTableConfig;
    @Input() minDate: Date;
    @Input() maxDate = new Date(Date.now());
    onTableEventHandler = new EventEmitter<any>();
    pageEvent: PageEvent;
    sidenavOpen = true;
    public results: IPagination<IExpense>;
    public dataSource = new MatTableDataSource<IExpense>([]);
    public selection = new SelectionModel<IExpense>(true, []);
    defaultFilters: IFilterOptions = {
        orderBy: 'created_at',
        way: 'desc',
        page: 1,
        limit: 10,
    };
    filters: IFilterOptions = Object.assign({}, this.defaultFilters);
    displayedColumns: string[] = ['selectMultiple','id','title', 'type','vendor' ,'price', 'updated_at'];
    pageSizeOptions = [10, 30, 50, 80, 100];
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
    });
    isHandset = false;
    dateFormat: string;
    CustomHeader = CustomDatePickerHeaderComponent;
    public expenseTypes: IExpenseType[] = [];
    public vendors: IVendor[] = [];
    private _subscriptions :any[] = [];

    constructor(
        private service: ExpenseService,
        private dialog: MatDialog,
        private exportService: ExportService,
        private appService: AppService,
    ) {

    }

    async ngOnInit() {
        this.displayedColumns = (this.columns.length > 0) ? this.columns : this.displayedColumns;
        this._subscriptions.push(this.isHandset$.subscribe(isIt => {
            this.isHandset = isIt;
            this.dateFormat = (!isIt) ? '' : 'DD';
            if (isIt) {
                this.displayedColumns = ['selectMultiple','title', 'price', 'updated_at'];
            }
        }));

        // this.expenseTypes$.subscribe(types => this.expenseTypes = types);
        // this.vendors$.subscribe(vendors => this.vendors = vendors);

        await this.getData();
    }

    ngOnDestroy() {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }

    async getData() {
        const d = this.dialog.open(LoadingDialogComponent);
        this.results = await this.service.find({
            ...{with: ['expenseTypes', 'vendor',]}, ...this.filters
        });

        this.dataSource.data = this.results.data;
        d.close();
    }

    async sortData($event: Sort) {
        this.filters.orderBy = $event.active;
        this.filters.way = $event.direction;

        await this.getData();
    }

    async changePage($event: PageEvent) {
        this.filters.page = $event.pageIndex + 1;
        this.filters.limit = $event.pageSize;
        //Get data again

        await this.getData();

        return $event;

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
        this.selectionChanged();
    }

    selectionChanged() {
        this.onTableEventHandler.emit({
            action: 'selectionChanged', value: {
                selectedItems: this.selection.selected
            }
        });

    }

    clearSelection() {
        this.selection.clear();
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: IExpense): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    async dateRangeChange() {
        this.filters.created_at = {
            min: (this.range.value.start) ? this.range.value.start.toISOString() : undefined,
            max: (this.range.value.end) ? this.range.value.end.toISOString() : new Date(Date.now()).toISOString()
        };


    }

    async applyFilters() {
        await this.getData();
    }

    buttonClicked() {
        console.log('hi')
    }

    async resetFilters() {
        this.filters = Object.assign({}, this.defaultFilters);
        await this.getData();
    }

    isRowSelected(id: number) {
        return findIndex(this.selection.selected, {id}) !== -1;
    }

    async downloadAsZip() {
        const result = await this.exportService.exportMany(this.selection.selected.map(i => i.id));
        this.appService.showSnackBar('Zip file created');
        window.open(result.zipFileName);
    }

    vendorSelected(vendor: IVendor) {
        this.filters.vendorId = vendor.id;
    }

    expenseTypeSelected(expenseType: IExpenseType) {
        this.filters.expenseTypeId = expenseType.id;
    }
}
