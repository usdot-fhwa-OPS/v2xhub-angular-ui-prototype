import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PluginsComponent } from './components/plugins/plugins.component';
import { HeaderComponent } from "./components/header/header.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PluginsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'v2xhub-angular-ui-prototype';
}
