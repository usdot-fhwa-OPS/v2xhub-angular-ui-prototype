import { Component } from '@angular/core';
import { PluginDisplayComponent } from '../plugin-display/plugin-display.component';
import { MessageFrequencyChartComponent } from '../message-frequency-chart/message-frequency-chart.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-rsuhealth-monitor-display',
  standalone: true,
  imports: [MessageFrequencyChartComponent, CardModule, DividerModule, MapComponent],
  templateUrl: './rsuhealth-monitor-display.component.html',
  styleUrl: './rsuhealth-monitor-display.component.css'
})
export class RSUHealthMonitorDisplayComponent extends PluginDisplayComponent {

}
