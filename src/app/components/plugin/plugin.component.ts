import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plugin } from '../../interfaces/plugin';
import { PluginConfigurationComponent } from "../plugin-configuration/plugin-configuration.component";
import {MatExpansionModule} from '@angular/material/expansion';



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

 


}
