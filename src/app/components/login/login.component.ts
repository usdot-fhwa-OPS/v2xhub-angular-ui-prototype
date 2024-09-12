import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCredentials } from '../../interfaces/user-credentials';
import {MatInputModule} from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HeaderComponent } from '../header/header.component';
import { AuthButtonComponent } from '../auth-button/auth-button.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, HeaderComponent, AuthButtonComponent, MatTabsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCred: UserCredentials = { username:'', password:''};

  constructor( private authService: AuthenticationService ) {
  }

  login() {
    this.authService.login(this.userCred.username, this.userCred.password);
  }
}
