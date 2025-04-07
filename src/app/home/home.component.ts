import {Component, inject} from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {AsyncPipe, DatePipe} from "@angular/common";
import {MovieComponent} from "./movie/movie.component";
import {CarouselComponent} from "./carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MovieComponent,
    AsyncPipe,
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService);
  movies: Observable<Movie[]> = this.moviesService.getMovies();
}
