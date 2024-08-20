import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { MessageIntervalData } from '../../interfaces/message-interval-data';


@Component({
  selector: 'app-message-interval-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './message-interval-chart.component.html',
  styleUrl: './message-interval-chart.component.css'
})
export class MessageIntervalChartComponent implements OnChanges{
  @Input()
  messageIntervalData: MessageIntervalData[] = new Array();

  @Input()
  messageType: string = "";

  @Input()
  messageSubtype: string = "";

  @Input()
  messageId: number = 0;

  chartData: Object = new Object();

  @ViewChild("chart")
  chart!: UIChart; 


  updateData(): void {
    
    this.chartData = {
        labels: this.messageIntervalData.map(data => data.timestamp),
        datasets: [
          {
            label: this.messageType + " "  + this.messageSubtype + " " + this.messageId,
            data: this.messageIntervalData.map(data => data.avgInterval)
          }
        ]
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
