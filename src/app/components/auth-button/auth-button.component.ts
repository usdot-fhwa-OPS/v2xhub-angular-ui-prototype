import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.css'
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}
}
