import { Injectable } from '@angular/core';
import { Plugin } from '../../interfaces/plugin';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor() { }

  private plugins: Plugin[] = new Array();

  processPlugins(list: Object): void {
    console.log( "Plugins found in list " + Object.keys(list))
    for (const pluginName of Object.keys(list)) {
      console.log("Attempting to retreive " + pluginName + " from telemetry list");
      let plugin = list[pluginName as keyof typeof list];
      let pluginObject = plugin as Object;
      let castPlugin = pluginObject as Plugin;
      castPlugin.name = pluginName;
      this.plugins.push(castPlugin)

    }
    
  }
  
}
