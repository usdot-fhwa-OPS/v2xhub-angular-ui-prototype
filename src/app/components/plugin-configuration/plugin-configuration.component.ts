import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { PluginConfiguration } from '../../interfaces/plugin-configuration';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-plugin-configuration',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './plugin-configuration.component.html',
  styleUrl: './plugin-configuration.component.css'
})
export class PluginConfigurationComponent {
  displayedColumns: string[] = ['name', 'description', 'value', 'default value'];
  @Input()
  pluginConfigurations: PluginConfiguration[] = new Array();

  @Output()
  pluginConfigurationChange = new EventEmitter<PluginConfiguration>();

  constructor() {
    
  }

  updateConfiguration(pluginConfig: PluginConfiguration) : void {
    this.pluginConfigurationChange.emit(pluginConfig);
  }
}
