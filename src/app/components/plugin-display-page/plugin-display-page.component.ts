import { Component,Input as RouterInput  } from '@angular/core';
import { PluginDisplayComponent } from '../plugin-display/plugin-display.component';
import { NgComponentOutlet } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RSUHealthMonitorDisplayComponent } from '../rsuhealth-monitor-display/rsuhealth-monitor-display.component';

const pluginDisplayFactory: Map<string, any> = new Map([
  ["RSUHealthMonitor", RSUHealthMonitorDisplayComponent]
]);
@Component({
  selector: 'app-plugin-display-page',
  standalone: true,
  imports: [NgComponentOutlet, HeaderComponent],
  templateUrl: './plugin-display-page.component.html',
  styleUrl: './plugin-display-page.component.css'
})
export class PluginDisplayPageComponent {
  @RouterInput()
  pluginName!: string;



  getPluginDisplayComponent(pluginName: string): any {
    if (pluginDisplayFactory.get(pluginName)) {
      return pluginDisplayFactory.get(pluginName);
    }
    else {
      return PluginDisplayComponent;
    }
  }
}
