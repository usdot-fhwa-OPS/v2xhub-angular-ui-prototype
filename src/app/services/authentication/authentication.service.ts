import { Injectable } from '@angular/core';
import { TelemetryService } from '../telemetry/telemetry.service';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private telemetryService: TelemetryService, private router: Router    ) { }

  private isAuthenticated: boolean = false;

  private level: number = 0 ;

  login(username: string, password: string) : void  {
    let loginRequest = {
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
                user: username,
                password: password
            }
        }
    };
    this.telemetryService.sendMsg(loginRequest);
  }

  loginResponse(response: Login): void {
    let status = response.status;
    let command = response.command
    if (status.toUpperCase() == "SUCCESS" && command.toUpperCase() == "LOGIN") {
      this.isAuthenticated = true;
      this.level = response.level;
      this.router.navigate(['/'])
    }

  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
