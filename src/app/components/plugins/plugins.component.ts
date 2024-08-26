import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plugin } from '../../classes/plugin/plugin';
import { NgFor } from '@angular/common';
import { PluginService } from '../../services/plugin/plugin.service';
import { PluginComponent } from '../plugin/plugin.component';
import { HeaderComponent } from "../header/header.component";
import { PluginConfigurationChange } from '../../events/plugin.configuration.change';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [FormsModule, PluginComponent, NgFor, HeaderComponent, MatButtonToggleModule , MatTabsModule],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.css'
})
export class PluginsComponent {
  pluginsList: Array<Plugin> = new Array();

  displayedPluginList: Array<Plugin> = new Array();
  // Default to show only enabled plugins
  pluginFilter: Array<string> = [ "Enabled"];

  constructor(private pluginService: PluginService) {
    pluginService.plugins.subscribe((plugins) => {
      this.pluginsList = pluginService.getPlugins();
      this.updateDisplayedPlugins();
    })
  }
  
  updateConfiguration(pluginConfigChange: PluginConfigurationChange): void {
    this.pluginService.updatePluginConfiguration(pluginConfigChange);
  }

  updateDisplayedPlugins(): void {
    this.displayedPluginList = new Array();
    console.log("Plugin filter %s", this.pluginFilter)
    for(let plugin of this.pluginsList) {
      if (this.pluginFilter.includes(plugin.enabled)) {
        this.displayedPluginList.push(plugin);
      }
    }
  }
  
}
