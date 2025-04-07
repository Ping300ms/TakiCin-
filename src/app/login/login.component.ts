import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

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
  private readonly router : Router = inject(Router);
  firstname: string = '';
  lastname: string = '';
  age: string = '';
  email: string = '';

  onSubmit() {
    console.log('Username:', this.firstname);
    console.log('Password:', this.lastname);
    console.log('Password:', this.age);
    console.log('Password:', this.email);

    localStorage.setItem('username', this.firstname);
    localStorage.setItem('lastname', this.lastname);
    localStorage.setItem('age', this.age);
    localStorage.setItem('email', this.email);
    localStorage.setItem('logged','true');

    this.router.navigate(['/account']);
  }
}
