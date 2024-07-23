import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCredentials } from '../../interfaces/user-credentials';
import { TelemetryService } from '../../services/telemetry.service';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCred: UserCredentials = { username:'', password:''};

  constructor( private tSerivice: TelemetryService ) {
  }

  private generateLoginCommand(): Object {
    return {
        header: {
            type: "Command",
            subtype: "Execute",
            encoding: "jsonstring",
            timestamp: (new Date).getTime(),
            flags: "0"
        },
        payload: {
              command: "login",
              id: "0",
              args: {
                  user: this.userCred.username,
                  password: this.userCred.password
              }
          }
      } ;
  }

  login() {
    this.tSerivice.sendMsg(this.generateLoginCommand());
  }
}
