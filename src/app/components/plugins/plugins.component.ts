import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plugin } from '../../interfaces/plugin';
import { NgFor } from '@angular/common';
import { PluginService } from '../../services/plugin/plugin.service';
import { PluginComponent } from '../plugin/plugin.component';
import { HeaderComponent } from "../header/header.component";
import { PluginConfigurationChange } from '../../events/plugin.configuration.change';

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [FormsModule, PluginComponent, NgFor, HeaderComponent],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.css'
})
export class PluginsComponent {
  pluginsList: Array<Plugin> = new Array();

  constructor(private pluginService: PluginService) {
    console.log("Getting plugin data from plugin service");
    pluginService.plugins.subscribe((plugins) => {
      this.pluginsList = pluginService.getPlugins();
    })
  }
  
  updateConfiguration(pluginConfigChange: PluginConfigurationChange): void {
    this.pluginService.updatePluginConfiguration(pluginConfigChange);
  }
  
}
