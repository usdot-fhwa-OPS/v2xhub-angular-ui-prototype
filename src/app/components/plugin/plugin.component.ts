import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plugin } from '../../interfaces/plugin';
import { PluginConfigurationComponent } from "../plugin-configuration/plugin-configuration.component";


@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [MatCardModule, PluginConfigurationComponent],
  templateUrl: './plugin.component.html',
  styleUrl: './plugin.component.css'
})
export class PluginComponent {
  @Input()
  plugin!: Plugin;

 


}
