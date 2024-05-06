import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PluginsComponent } from './components/plugins/plugins.component';
import { LoginComponent } from './components/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PluginsComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'v2xhub-angular-ui-prototype';
}
