import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

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
}
