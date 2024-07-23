import { Component } from '@angular/core';
import { TelemetryService } from '../../services/telemetry.service';
import { FormsModule } from '@angular/forms';
import { PluginComponent } from '../../component/plugin/plugin.component';

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.css'
})
export class PluginsComponent {
  plugins: Array<PluginComponent> = new Array();

  constructor(private tservice: TelemetryService) {
    console.log("Web Socket connected");
  }
  
  processPluginUpdate(update: Object): void {
    console.log("Processing update " + JSON.stringify(update) + " ...")
  }
}
