import { Component, Input as RouterInput  } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Stack } from '../../data/stack';
import { PluginMessage } from '../../interfaces/plugin-message';
import { Plugin } from '../../interfaces/plugin';
import { PluginService } from '../../services/plugin/plugin.service';
import { KeyValuePipe, NgFor } from '@angular/common';
import { MessageFrequencyData } from '../../interfaces/message-interval-data';
import { MessageFrequencyChartComponent } from '../message-frequency-chart/message-frequency-chart.component';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-plugin-display',
  standalone: true,
  imports: [MessageFrequencyChartComponent, HeaderComponent, NgFor, KeyValuePipe, ChartModule],
  templateUrl: './plugin-display.component.html',
  styleUrl: './plugin-display.component.css'
})
export class PluginDisplayComponent {
  @RouterInput()
  pluginName!: string;

  plugin: Plugin = new Plugin();

  msgData: Map<string, MessageFrequencyData[]> = new Map();

    
  constructor(private pluginService: PluginService) {
    pluginService.plugins.subscribe((plugins) => {
      console.log("Router input %s", this.pluginName);
      if (this.pluginName) {
        this.plugin = pluginService.getPlugin(this.pluginName);
        if (this.plugin?.messages ) {
          this.msgData = convertPluginMessagesToChartJSData(this.plugin.messages);
        }
      }
    })
  }
}
/**
 * Function to convert Plugin Message Stack to array of MessageInterface data points for ChartJS
 * @param pluginMessages 
 * @returns 
 */
function convertPluginMessagesToChartJSData(pluginMessages: Map<number, Stack<PluginMessage>>): Map<string, MessageFrequencyData[]> {
  let chartData = new Map<string, MessageFrequencyData[] >()
  pluginMessages.forEach((value: Stack<PluginMessage>, key: number) => {
    let messageData = new Array();
    let messageStack = value.toArray();
    let messageName = ""
    messageStack.forEach((value: PluginMessage) => {
      let msgData = new MessageFrequencyData();
      msgData.timestamp = value.lastTimestamp;
      // Convert ms interval to frequency
      msgData.avgFrequency = 1/(value.averageInterval/1000);
      messageData.push(msgData);
      if (messageName.length == 0) {
        messageName = "Type: " + value.type + " Subtype : " + value.subtype; 
      }
    })
    chartData.set(messageName, messageData);

  })
  return chartData;
}