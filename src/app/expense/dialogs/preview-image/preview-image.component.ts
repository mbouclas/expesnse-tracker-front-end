import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AttachmentService} from '../../../attachment/attachment.service';

interface IPreviewImageDialogData {
  id: number;
}

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent implements OnInit {
  imageUrl: string;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IPreviewImageDialogData,
      private service: AttachmentService,
      public dialogRef: MatDialogRef<PreviewImageComponent>,
  ) { }

  async ngOnInit() {
    this.imageUrl = await this.service.getImageUrl(this.data.id);
  }

  close() {
    this.dialogRef.close();
  }

}
