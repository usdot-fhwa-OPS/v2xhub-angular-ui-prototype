import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-plugin-display',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './plugin-display.component.html',
  styleUrl: './plugin-display.component.css'
})
export class PluginDisplayComponent {
  data: any;
    
  constructor() {
  let other = [
    {year: 2008, value: 0.07686},
    {year: 2008, value: 0.08636},
    {year: 2009, value: 0.096889},
    {year: 2009, value: 0.01234},
    {year: 2010, value: 0.06686},      
  ]


  this.data = {
          labels: other.map(y=>y.year),
          datasets: [
              {
                  label: 'First Dataset',
                  data: other.map(y=>y.value)
              }
          ]
      }
  }
}
