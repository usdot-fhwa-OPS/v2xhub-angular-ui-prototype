import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { PluginConfiguration } from '../../interfaces/plugin-configuration';


@Component({
  selector: 'app-plugin-configuration',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './plugin-configuration.component.html',
  styleUrl: './plugin-configuration.component.css'
})
export class PluginConfigurationComponent {
  displayedColumns: string[] = ['name', 'description', 'value', 'default value'];
  @Input()
  pluginConfigurations: PluginConfiguration[] = new Array();

  constructor() {
    
  }
}
