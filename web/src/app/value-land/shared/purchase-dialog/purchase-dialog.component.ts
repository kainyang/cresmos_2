import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackResult } from 'src/app/core/models/core.model';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.scss']
})
export class PurchaseDialogComponent implements AfterViewInit {
  @ViewChild('closeButton', { static: false }) closeButtonEl: HTMLElement;

  feedbackResult = FeedbackResult;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit(): void {
    if (this.closeButtonEl) {
      this.closeButtonEl.focus();
    }
  }

}
