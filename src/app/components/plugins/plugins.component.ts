import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plugin } from '../../interfaces/plugin';
import { NgFor } from '@angular/common';
import { PluginService } from '../../services/plugin/plugin.service';
import { PluginComponent } from '../plugin/plugin.component';

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [FormsModule,PluginComponent, NgFor],
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
  
  
}
