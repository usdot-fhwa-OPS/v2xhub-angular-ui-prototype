import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Plugin } from '../../interfaces/plugin';


@Component({
  selector: 'app-plugin',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './plugin.component.html',
  styleUrl: './plugin.component.css'
})
export class PluginComponent {
  @Input()
  plugin!: Plugin;


}
