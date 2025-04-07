import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {ToastService} from "./services/toast.service";
import {NgForOf} from "@angular/common";

import { provideToastr } from 'ngx-toastr';
import {provideAnimations} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})


export class AppComponent {
  constructor(protected toastService: ToastService) { }

  showToast(message: string) {
    this.toastService.add(message);
  }
  removeToast(index: number): void {
    this.toastService.remove(index)
  }
  title = 'YannCiné';
}
