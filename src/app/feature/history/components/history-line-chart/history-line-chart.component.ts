import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartOptions, ChartData } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

import { selectOrdersForChart } from './../../store/selecters/index';

@Component({
  selector: 'app-history-line-chart',
  templateUrl: './history-line-chart.component.html',
  styleUrls: ['./history-line-chart.component.scss']
})
export class HistoryLineChartComponent {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public tradeData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Change of the balance' }
    ],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private readonly store: Store) {
    this.store.select(selectOrdersForChart).subscribe(items => {
      this.tradeData.datasets[0].data = items;
      this.tradeData.labels = Object.keys(items);
      this.chart && this.chart.chart.update();
    })
  }
}
