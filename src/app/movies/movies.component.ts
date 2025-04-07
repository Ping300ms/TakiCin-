import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MoviesService} from "../services/movies.service";
import {Movie} from "../models/movie";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent{
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);
  movies: Movie[] = this.moviesService.getMovies();

  deleteMovie(movie:Movie): void {
    this.moviesService.deleteMovie(movie);
  }
}
