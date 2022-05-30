import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgChartsModule } from 'ng2-charts';

import { MaterialModule } from './../../services';
import { reducers } from './store/reducers';
import { PipesModule } from '../../pipes';

import { HistoryPageComponent } from './history.component';
import { HistoryItemComponent } from './components/history-item';
import { HistoryLineChartComponent } from './components/history-line-chart';
import { HistoryBlockComponent } from './components/history-block';
import { HistoryAddOrderDialogComponent } from './components/history-add-order-dialog';

@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryItemComponent,
    HistoryLineChartComponent,
    HistoryBlockComponent,
    HistoryAddOrderDialogComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HistoryPageComponent
      }
    ]),
    CommonModule,
    StoreModule.forFeature('HistoryFeature', reducers),
    ScrollingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    PipesModule
  ],
})
export class HistoryPageModule { }
