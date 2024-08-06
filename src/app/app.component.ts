import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PluginsComponent } from './components/plugins/plugins.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PluginsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'v2xhub-angular-ui-prototype';
}
