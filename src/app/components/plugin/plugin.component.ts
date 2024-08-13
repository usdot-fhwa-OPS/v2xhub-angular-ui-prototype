import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plugin } from '../../interfaces/plugin';
import { PluginConfigurationComponent } from "../plugin-configuration/plugin-configuration.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { PluginConfiguration } from '../../interfaces/plugin-configuration';
import { PluginConfigurationChange } from '../../events/plugin.configuration.change';



@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [MatCardModule, PluginConfigurationComponent, MatExpansionModule],
  templateUrl: './plugin.component.html',
  styleUrl: './plugin.component.css'
})
export class PluginComponent {
  @Input()
  plugin!: Plugin;

  @Output()
  onConfigChange = new EventEmitter<PluginConfigurationChange>();

 

  pluginConfigurationChange(pluginConfig: PluginConfiguration): void {
    let pluginConfigChange: PluginConfigurationChange = new PluginConfigurationChange()
    pluginConfigChange.plugin = this.plugin.name;
    pluginConfigChange.key = pluginConfig.name;
    pluginConfigChange.value = pluginConfig.value;
    this.onConfigChange.emit(pluginConfigChange);
  }
}
