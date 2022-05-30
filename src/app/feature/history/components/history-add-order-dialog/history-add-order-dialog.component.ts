import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { onlyEntryLessExitDate, OnlyEntryLessExitDateMatcher } from './../../services/entry-less-exit-date.group-validator';
import { selectSelectedOrder } from '../../store/selecters';
import { addOrderAction, editOrderAction, removeSelectedOrderAction } from './../../store/actions';

import { IOrder } from './../../history.constants';
import { HistoryItemHelpers } from '../../history.helpers';

@Component({
  selector: 'app-history-add-order-dialog',
  templateUrl: './history-add-order-dialog.component.html',
  styleUrls: ['./history-add-order-dialog.component.scss']
})
export class HistoryAddOrderDialogComponent implements OnInit, OnDestroy {
  public groupControl = new FormGroup({
    orderType: new FormControl(null, Validators.required),
    entryPrice: new FormControl(null, [Validators.required]),
    exitPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
    entryDate: new FormControl(null, [Validators.required, Validators.min(0)]),
    exitDate: new FormControl(null, Validators.required),
  },{
    validators: [onlyEntryLessExitDate()],
    updateOn: 'blur',
  });

  public matcher = new OnlyEntryLessExitDateMatcher();
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<HistoryAddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {orderId?: number},
  ) { }

  ngOnInit() {
    this.data.orderId && this.store.select(selectSelectedOrder).subscribe((selectedOrder) => {
      if(selectedOrder) {
        const {orderId, profit, ...order} = selectedOrder;
        this.groupControl.setValue(order);
      }
    });

  }

  ngOnDestroy() {
    this.data && this.store.dispatch(removeSelectedOrderAction());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if(this.groupControl.invalid) return;
    const order: Partial<IOrder> = {
      ...this.groupControl.value,
      profit: HistoryItemHelpers.calcProfit(this.groupControl.value.orderType,
                                            this.groupControl.value.entryPrice,
                                            this.groupControl.value.exitPrice),
    };
    if(this.data.orderId) {
      this.store.dispatch(editOrderAction({orderId: this.data.orderId, order }));
    } else {
      order.orderId = Date.now();
      this.store.dispatch(addOrderAction({ order: order as IOrder }));
    }
    this.closeDialog();
  }
}
