import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plugin } from '../../interfaces/plugin';
import { PluginConfigurationComponent } from "../plugin-configuration/plugin-configuration.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { PluginConfiguration } from '../../interfaces/plugin-configuration';
import { PluginConfigurationChange } from '../../events/plugin.configuration.change';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [MatCardModule, PluginConfigurationComponent, MatExpansionModule, MatSlideToggleModule, MatIconModule, MatButtonModule],
  templateUrl: './plugin.component.html',
  styleUrl: './plugin.component.css'
})
export class PluginComponent {
  @Input()
  plugin!: Plugin;

  @Output()
  onConfigChange = new EventEmitter<PluginConfigurationChange>();

  constructor(private router: Router) {

  }

  pluginConfigurationChange(pluginConfig: PluginConfiguration): void {
    let pluginConfigChange: PluginConfigurationChange = new PluginConfigurationChange()
    pluginConfigChange.plugin = this.plugin.name;
    pluginConfigChange.key = pluginConfig.name;
    pluginConfigChange.value = pluginConfig.value;
    this.onConfigChange.emit(pluginConfigChange);
  }

  isEnabled(): boolean {
    return this.plugin.enabled == "Enabled";
  }

  navigatePluginDisplay(): void {
    this.router.navigate(['plugin/' + this.plugin.name]);

  }
}
