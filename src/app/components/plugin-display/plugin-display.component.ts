import { Component, Input } from '@angular/core';
import { PluginMessage } from '../../interfaces/plugin-message';
import { Plugin } from '../../classes/plugin/plugin';
import { PluginService } from '../../services/plugin/plugin.service';
import { MessageFrequencyData } from '../../classes/plugin/message-interval-data';
import { MessageFrequencyChartComponent } from '../message-frequency-chart/message-frequency-chart.component';
import { Queue } from '../../data/queue';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-plugin-display',
  standalone: true,
  imports: [MessageFrequencyChartComponent, CardModule, DividerModule],
  templateUrl: './plugin-display.component.html',
  styleUrl: './plugin-display.component.css'
})
export class PluginDisplayComponent {
  @Input()
  name!: string;

  plugin: Plugin = new Plugin();

  msgData: Map<string, MessageFrequencyData[]> = new Map();

    
  constructor(private pluginService: PluginService) {
    pluginService.plugins.subscribe((plugins) => {
      console.log("Router input %s", this.name);
      if (this.name) {
        this.plugin = pluginService.getPlugin(this.name);
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
function convertPluginMessagesToChartJSData(pluginMessages: Map<number, Queue<PluginMessage>>): Map<string, MessageFrequencyData[]> {
  let chartData = new Map<string, MessageFrequencyData[] >()
  pluginMessages.forEach((value: Queue<PluginMessage>, key: number) => {
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