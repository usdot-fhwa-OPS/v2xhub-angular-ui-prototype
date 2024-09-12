import { Injectable, Injector } from '@angular/core';
import { Plugin, PluginState } from '../../classes/plugin/plugin';
import { PluginConfiguration } from '../../interfaces/plugin-configuration';
import { BehaviorSubject } from 'rxjs';
import { TelemetryService } from '../telemetry/telemetry.service';
import { PluginConfigurationChange } from '../../events/plugin.configuration.change';
import { PluginMessage } from '../../interfaces/plugin-message';
import { Stack } from '../../data/stack';
import { Queue } from '../../data/queue';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private injector: Injector) { }

  private pluginsSubject: BehaviorSubject<Map<string, Plugin>> = new BehaviorSubject(new Map());

  plugins = this.pluginsSubject.asObservable()


  processPlugins(list: Object): void {
    console.log("Plugins found in list " + Object.keys(list))
    let pluginMap = new Map();
    for (const pluginName of Object.keys(list)) {
      console.log("Attempting to retreive " + pluginName + " from telemetry list");
      let plugin = list[pluginName as keyof typeof list];
      let pluginObject = plugin as Object;
      let castPlugin = pluginObject as Plugin;
      castPlugin.name = pluginName;
      console.log("Found plugin %s, %s, %s ", castPlugin.name, castPlugin.exeName, castPlugin.version);
      pluginMap.set(pluginName,castPlugin)
    }
    this.pluginsSubject.next(pluginMap);
  }

  processConfigurations(list: Object): void {
    console.log("Plugins configuration found in list " + Object.keys(list));
    let pluginMap = this.pluginsSubject.value;
    for (const pluginName of Object.keys(list)) {
      // TODO: Fix all this casting. Is there a better way to do this
      console.log("Attemtping to retreive configurations for " + pluginName + " from configuration list");
      let pluginConfigurations = list[pluginName as keyof typeof list];
      let pluginConfigurationsObject = pluginConfigurations as Object;
      let pluginConfigurationArray: PluginConfiguration[];
      if (pluginMap.get(pluginName)!.configuration) {
        pluginConfigurationArray = pluginMap.get(pluginName)!.configuration;
      } else {
        pluginConfigurationArray = new Array();
      }
      console.log("Plugins configuration found in list " + Object.keys(pluginConfigurationsObject));

      for (const pluginConfig of Object.keys(pluginConfigurationsObject)) {
        console.log("Attempting to retreive  " + pluginConfig + " from " + pluginName + " configuration list");
        let pluginConfiguration = pluginConfigurationsObject[pluginConfig as keyof typeof pluginConfigurationsObject];
        let pluginConfigurationObject = pluginConfiguration   as Object;
        let castPluginConfiguration = pluginConfigurationObject as PluginConfiguration;
        castPluginConfiguration.name = pluginConfig;
        pluginConfigurationArray.push(castPluginConfiguration);
      }
      pluginMap.get(pluginName)!.configuration = pluginConfigurationArray;
    }
    this.pluginsSubject.next(pluginMap);

  }

  processPluginState(list: Object): void {
    console.log("Plugin State found in list " + Object.keys(list));
    let pluginMap = this.pluginsSubject.value;
    for (const pluginName of Object.keys(list)) {
      // TODO: Fix all this casting. Is there a better way to do this
      console.log("Attemtping to retreive state for " + pluginName + " from state list");
      let pluginState = list[pluginName as keyof typeof list];
      let pluginStateObject = pluginState as Object;
      pluginMap.get(pluginName)!.state = pluginStateObject as PluginState;
    }
    this.pluginsSubject.next(pluginMap);

  }


  processPluginMessages(list: Object): void {
    console.log("Plugins Messages found in list " + Object.keys(list));
    let pluginMap = this.pluginsSubject.value;
    for (const pluginName of Object.keys(list)) {
      // TODO: Fix all this casting. Is there a better way to do this
      console.log("Attemtping to Messages configurations for " + pluginName + " from configuration list");
      let pluginMessages = list[pluginName as keyof typeof list];
      let pluginMessagesObject = pluginMessages as Object;
      let pluginMessagesArray = pluginMessagesObject as PluginMessage[];
      let existingPluginMessagesArray: Map<number, Queue<PluginMessage>>;

      if (pluginMap.get(pluginName)!.messages) {
        existingPluginMessagesArray = pluginMap.get(pluginName)!.messages;
      } else {
        existingPluginMessagesArray = new Map();
      }
      for (const pluginMessage of pluginMessagesArray) {
        if (existingPluginMessagesArray.get(pluginMessage.id)) {
          existingPluginMessagesArray.get(pluginMessage.id)!.enqueue(pluginMessage);
        } else {
          let newStack = new Queue<PluginMessage>(20);
          newStack.enqueue(pluginMessage);
          existingPluginMessagesArray.set(pluginMessage.id, newStack);
        }
      }
      console.log("Updating messages for plugin %s to %d", pluginName, existingPluginMessagesArray.size)
      pluginMap.get(pluginName)!.messages = existingPluginMessagesArray;
    }
    this.pluginsSubject.next(pluginMap);

  }

  getPlugins(): Plugin[] {
    return Array.from(this.pluginsSubject.value.values());
  }

  getPlugin(name: string): Plugin {
    return this.pluginsSubject.value.get(name)!;
  }

  updatePluginConfiguration(pluginConfigChange: PluginConfigurationChange): void {
    let loginRequest = {
      header: {
          type: "Command",
          subtype: "Execute",
          encoding: "jsonstring",
          timestamp: (new Date).getTime(),
          flags: "0"
      },
      payload: {
            command: "set",
            id: "0",
            args: pluginConfigChange
        }
    };
    console.log("Hello")
    this.injector.get<TelemetryService>(TelemetryService).sendMsg(loginRequest);
  }

  sendServerMessage(message: any): void {
    console.log(message);
    this.injector.get<TelemetryService>(TelemetryService).sendMsg(message);
  }
  
}
