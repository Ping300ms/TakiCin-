import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.scss'
})
export class ShowMovieComponent {
  private readonly id;
  movieRequest : Observable<Movie>;
  movie : Movie | undefined;
  private readonly moviesService : MoviesService = inject(MoviesService);

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.movieRequest = this.moviesService.getMovie(this.id);
    this.movieRequest.subscribe((movie) => this.movie = movie);
  }
}
