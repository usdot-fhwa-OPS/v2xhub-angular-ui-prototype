import { Component } from '@angular/core';
import { TelemetryService } from '../../services/telemetry.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.css'
})
export class PluginsComponent {
  message: string ="";
  constructor(private tservice: TelemetryService) {
    tservice.connect();
    console.log("Web Socket connected");
  }
  
  sendText(): void {
    this.tservice.sendMsg(this.message);
  }
}
