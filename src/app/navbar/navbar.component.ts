import {Component, Input} from '@angular/core';
import {TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({ required: true }) title! : string
  protected readonly localStorage = localStorage;

  logout() : void {
    localStorage.clear();
  }
}
