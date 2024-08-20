import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { MessageFrequencyData } from '../../interfaces/message-interval-data';
import 'chartjs-adapter-date-fns';


class DataPoint{
 
  constructor(public x: string, public y: number) {
  }
}

@Component({
  selector: 'app-message-frequency-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './message-frequency-chart.component.html',
  styleUrl: './message-frequency-chart.component.css'
})
export class MessageFrequencyChartComponent implements OnChanges{
  @Input()
  messageIntervalData: MessageFrequencyData[] = new Array();

  @Input()
  messageName: string = "";

  chartData: Object = new Object();

  chartOptions: Object = new Object();

  @ViewChild("chart")
  chart!: UIChart; 

  constructor() {
    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        x: {
          // The axis for this scale is determined from the first letter of the id as `'x'`
          // It is recommended to specify `position` and / or `axis` explicitly.
          type: 'timeseries',
        }
      }
    }
  }

  updateData(): void {
    this.chartData = {
        datasets: [
          {
            label: this.messageName,
            data: this.messageIntervalData.map(data => new DataPoint(data.timestamp, data.avgFrequency))
          }
        ]
    };
    if (this.chart) {
      // this.chart.getCanvas().width = 100;
      // this.chart.getCanvas().height = 100;
      // this.chart.getCanvas().resize();
      this.chart.refresh();
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.updateData();
  }

}
