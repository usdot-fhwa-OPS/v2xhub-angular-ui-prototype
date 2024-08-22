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
  allData: Map<string, MessageFrequencyData[]> = new Map();

  chartData: Object = new Object();

  chartOptions: Object = new Object();

  @ViewChild("chart")
  chart!: UIChart; 

  constructor() {
    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: false,
      animation: false,
      scales: {
        x: {
          // The axis for this scale is determined from the first letter of the id as `'x'`
          // It is recommended to specify `position` and / or `axis` explicitly.
          type: 'timeseries',
          title: {
            display:true,
            text: "Time"
          }
        
        },
        y: {
          title: {
            display:true,

            text: ' Message Frequency (Hz) '
          }
        }
      }
    }
  }

  updateData(): void {
    this.chartData = {
      datasets: Array.from(this.allData).map(([name, messageData]) => {
        let dataset = {
          label: name,
          data: messageData.map(data => new DataPoint(data.timestamp, data.avgFrequency))
        }
        return dataset;
      })    
    };
    if (this.chart) {
      this.chart.refresh();
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.updateData();
  }

}
