import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HistoryAddOrderDialogComponent } from './../history-add-order-dialog/history-add-order-dialog.component';
import { addOrderAction, removeOrderAction, clearOrdersAction, selectOrderAction } from './../../store/actions';
import { selectOrders } from '../../store/selecters';

@Component({
  selector: 'app-history-block',
  templateUrl: './history-block.component.html',
  styleUrls: ['./history-block.component.scss']
})
export class HistoryBlockComponent implements OnInit {
  public items = [];

  constructor(private readonly store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.select(selectOrders).subscribe(items => this.items = items);
  }

  openDialog(orderId?: number): void {
    orderId && this.store.dispatch(selectOrderAction({ orderId }));
    const dialogRef = this.dialog.open(HistoryAddOrderDialogComponent, {
      width: '600px',
      data: { orderId },
    });
  }

}
