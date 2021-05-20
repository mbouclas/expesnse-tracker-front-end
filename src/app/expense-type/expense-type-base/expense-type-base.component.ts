import {Component, OnInit, Output, EventEmitter, Injector, OnDestroy} from '@angular/core';
import {ExpenseTypeModel} from '../../models/expense-type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../shared/services/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpenseTypeService} from '../expense-type.service';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-expense-type-base',
  templateUrl: './expense-type-base.component.html',
  styleUrls: ['./expense-type-base.component.scss']
})
export class ExpenseTypeBaseComponent implements OnInit, OnDestroy {
  @Select('isHandset') isHandset$: Observable<boolean>;
  @Output() onSave = new EventEmitter<ExpenseTypeModel>();
  public item = new ExpenseTypeModel();
  protected route: ActivatedRoute;
  protected router: Router;
  protected appService: AppService;
  protected formBuilder: FormBuilder;
  protected service: ExpenseTypeService;
  public form: FormGroup;
  public debugMode = false;
  public isHandset = false;
  protected isReady = false;
  protected _subscriptions :any[] = [];

  constructor(injector: Injector) {
    this.formBuilder = injector.get<FormBuilder>((FormBuilder));
    this.route = injector.get<ActivatedRoute>((ActivatedRoute));
    this.router = injector.get<Router>((Router));
    this.appService = injector.get<AppService>((AppService));
    this.service = injector.get<ExpenseTypeService>((ExpenseTypeService));
  }

  ngOnInit(): void {
    this._subscriptions.push(this.isHandset$.subscribe(isIt => this.isHandset = isIt));
    this.setupForm();

    this.form.valueChanges.subscribe(c => {
      if (!this.isReady) {return;}
      Object.keys(c).forEach(key => this.item[key] = c[key]);
    });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected setupForm() {
    this.form = this.formBuilder.group({
      title: [this.item.title, [Validators.required]],
    });
  }

  async save() {
    if (this.form.invalid) {
      return;
    }
  }

  getError(name: string, type = 'required') {
    if (!this.form) {return false;}
    const control = this.form.get(name);

    if (!control) { return false;}
    if (!control.touched) {return ;}
    return control.getError(type);
  }

  setUpFormValues() {
    Object.keys(this.form.controls)
        .forEach(key => {
          this.form.controls[key].setValue(this.item[key]);
        });

  }
}
