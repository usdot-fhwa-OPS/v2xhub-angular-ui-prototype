import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Stack } from '../../data/stack';
import { PluginMessage } from '../../interfaces/plugin-message';
import { Plugin } from '../../interfaces/plugin';
import { PluginService } from '../../services/plugin/plugin.service';
import { Input as RouterInput } from '@angular/core'
import { KeyValuePipe, NgFor } from '@angular/common';
import { MessageIntervalData } from '../../interfaces/message-interval-data';
import { MessageIntervalChartComponent } from '../message-interval-chart/message-interval-chart.component';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-plugin-display',
  standalone: true,
  imports: [MessageIntervalChartComponent, HeaderComponent, NgFor, KeyValuePipe, ChartModule],
  templateUrl: './plugin-display.component.html',
  styleUrl: './plugin-display.component.css'
})
export class PluginDisplayComponent {
  @RouterInput()
  pluginName!: string;

  plugin: Plugin = new Plugin();

  msgData: Map<number, MessageIntervalData[]> = new Map();

    
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
function convertPluginMessagesToChartJSData(pluginMessages: Map<number, Stack<PluginMessage>>): Map<number, MessageIntervalData[]> {
  let chartData = new Map<number, MessageIntervalData[] >()
  pluginMessages.forEach((value: Stack<PluginMessage>, key: number) => {
    let messageData = new Array();
    let messageStack = value.toArray();
    messageStack.forEach((value: PluginMessage) => {
      let msgData = new MessageIntervalData();
      msgData.timestamp = value.lastTimestamp;
      msgData.avgInterval = value.averageInterval;
      messageData.push(msgData);
    })
    chartData.set(key, messageData);

  })
  return chartData;
}