import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {MoviesService} from "../services/movies.service";
import {Movie} from "../models/movie";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "../services/toast.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent{
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);
  constructor(protected toastService: ToastService) {}
  movies: Observable<Movie[]> = this.moviesService.getMovies();

  deleteMovie(movie:Movie): void {
    this.moviesService.deleteMovie(movie);
  }

  removeToast(index:number){
    this.toastService.remove(index);
  }
}
