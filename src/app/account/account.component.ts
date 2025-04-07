import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-account',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  protected readonly localStorage = localStorage;
  private readonly router : Router = inject(Router);

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
