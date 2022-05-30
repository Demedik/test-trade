import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { removeOrderAction } from '../../store/actions';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent {
  @Input() orderId: number;
  @Input() orderType: string;
  @Input() entryDate: Date;
  @Input() exitDate: Date;
  @Input() entryPrice: number;
  @Input() exitPrice: number;
  @Input() profit: number;

  @Output() edit = new EventEmitter<number | null>()

  constructor(private store: Store) { }

  public onEdit() {
    this.edit.emit(this.orderId);
  }

  public onRemove() {
    this.store.dispatch(removeOrderAction({orderId: this.orderId }));
  }
}
