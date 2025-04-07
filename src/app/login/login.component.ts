import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  firstname: string = '';
  lastname: string = '';
  age: string = '';
  email: string = '';

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.firstname);
    console.log('Password:', this.lastname);
    console.log('Password:', this.age);
    console.log('Password:', this.email);

    // Add authentication logic and navigate to the next page upon successful login
  }
}
