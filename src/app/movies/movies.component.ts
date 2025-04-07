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
  movies: Observable<Movie[]>;
  movieList: Movie[] | undefined;
  constructor() {
    this.movies = this.moviesService.getMovies();
    this.movies.subscribe((movies) => this.movieList = movies);
  }

  deleteMovie(movie:Movie): void {
    this.moviesService.deleteMovie(movie);
    this.router.navigate(["/movies"]);
  }

  exportCSS() {
    if (!this.movieList) {
      console.log('no movie list');
      return;
    }
    const headers = ['ID', 'Title', 'Release Date', 'Director', 'Rating', 'Synopsis', 'Image'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    this.movieList.forEach(movie => {
      let date : string = movie.releaseDate.toString();
      const row = [
        movie.id || '',
        `"${movie.title}"`,
        date,
        `"${movie.director}"`,
        movie.rate || '',
        `"${movie.synopsis}"`,
        movie.image || ''
      ];
      csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'movies.csv';
    link.click();
  }
}
