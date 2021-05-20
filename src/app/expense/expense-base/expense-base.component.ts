import {Component, Input, OnInit, EventEmitter, Output, Injector, OnDestroy} from '@angular/core';
import {ExpenseModel, IExpense} from '../../models/expense.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpenseService} from '../expense.service';
import {AppService} from '../../shared/services/app.service';
import {Select} from '../../decorators/select.decorator';
import {IExpenseType} from '../../models/expense-type.model';
import {Observable} from 'rxjs';
import {IVendor} from '../../models/vendor.model';
import {AttachmentModel, IAttachment} from '../../models/attachment.model';
import {AttachmentService} from '../../attachment/attachment.service';
import {ICameraSelection} from '../../camera/camera/camera.component';
import {IOnUploadResponse} from '../../uploader/uploader.service';

@Component({
  selector: 'app-expense-base',
  templateUrl: './expense-base.component.html',
  styleUrls: ['./expense-base.component.scss']
})
export class ExpenseBaseComponent implements OnInit, OnDestroy {
  @Select('expenseTypes') expenseTypes$: Observable<IExpenseType[]>;
  @Select('vendors') vendors$: Observable<IVendor[]>;
  @Select('isHandset') isHandset$: Observable<boolean>;
  @Input() id: string;
  @Input() isDialog = false;
  @Output() onSave = new EventEmitter<IExpense>();
  public item = new ExpenseModel();
  protected route: ActivatedRoute;
  protected router: Router;
  protected snackBar: MatSnackBar;
  protected dialog: MatDialog;
  protected formBuilder: FormBuilder;
  protected service: ExpenseService;
  protected appService: AppService;
  protected attachmentService: AttachmentService;
  public form: FormGroup;
  public expenseTypes: IExpenseType[] = [];
  public vendors: IVendor[] = [];
  public debugMode = false;
  public selectedImageThumbnail: string;
  public isHandset = false;
  protected isReady = false;
  protected _subscriptions :any[] = [];

  constructor(protected injector: Injector) {
    this.formBuilder = injector.get<FormBuilder>((FormBuilder));
    this.snackBar = injector.get<MatSnackBar>((MatSnackBar));
    this.route = injector.get<ActivatedRoute>((ActivatedRoute));
    this.router = injector.get<Router>((Router));
    this.dialog = injector.get<MatDialog>((MatDialog));
    this.service = injector.get<ExpenseService>((ExpenseService));
    this.appService = injector.get<AppService>((AppService));
    this.attachmentService = injector.get<AttachmentService>((AttachmentService));
    this.expenseTypes$.subscribe(types => this.expenseTypes = types);
    this.vendors$.subscribe(vendors => this.vendors = vendors);
  }

  async ngOnInit() {
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
      price: [this.item.price, [Validators.required]],
      expenseTypes: [this.item.expenseTypes],
      vendorId: [this.item.vendorId],
    });
  }

  async onImageSelected(selection: ICameraSelection) {
    const res = await this.attachmentService.saveBase64ToFile(selection.image.base64String, selection.image.format);

    const attachment = new AttachmentModel();
    attachment.url = res.fileName;
    attachment.attachment_type = res.fileType.type;
    attachment.preview = selection.preview;
    this.item.attachments.push(attachment);
  }

  async removeAttachment(idx: number) {
    const c = confirm('Are you sure?');
    if (!c) {return;}
    // Temp
    if (!this.item.attachments[idx].id) {
      this.item.attachments.splice(idx, 1);
      return;
    }

    await this.attachmentService.delete(this.item.attachments[idx].id);
    this.item.attachments.splice(idx, 1);
  }

  getError(name: string, type = 'required') {
    if (!this.form) {return false;}
    const control = this.form.get(name);

    if (!control) { return false;}
    if (!control.touched) {return ;}
    return control.getError(type);
  }

  async downloadAsZip() {
  }

  async emailAsZip() {

  }

  onFileUploaded(res: IOnUploadResponse) {
    const attachment = new AttachmentModel();
    attachment.url = res.file.name;
    attachment.attachment_type = res.file.type;
    if (res.response && Array.isArray(res.response.uploadedFiles) && attachment.attachment_type.indexOf('image') !== -1) {
      attachment.preview = res.response.uploadedFiles[0].preview;
    }
    this.item.attachments.push(attachment);
  }

  onUploadsComplete(complete: boolean) {

  }

  getFileIcon(attachment: IAttachment) {
    if (attachment.attachment_type.indexOf('pdf') !== -1) {
      return 'pdf';
    }
    else if (attachment.attachment_type.indexOf('word') !== -1) {
      return 'word';
    }
    else {
      return 'file'
    }
  }

  async downloadFile(attachment: IAttachment) {
    const url = await this.attachmentService.downloadFile(attachment);
    window.open(url);
  }
}
