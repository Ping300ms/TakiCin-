import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";

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
  movie : Movie | null = null;
  private readonly moviesService : MoviesService = inject(MoviesService);

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.movie = this.moviesService.getMovie(this.id);
  }
}
