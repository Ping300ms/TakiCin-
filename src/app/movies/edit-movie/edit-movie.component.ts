import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Task} from "zone.js/lib/zone-impl";

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent {
  private readonly id;
  movie : Observable<Movie>;
  private readonly moviesService : MoviesService = inject(MoviesService);
  private readonly router : Router = inject(Router);
  newMovie : Movie | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.movie = this.moviesService.getMovie(this.id);
    this.movie.subscribe((movie) => {
      this.newMovie = {
        id: movie.id,
        director: movie.director,
        image: movie.image,
        rate: movie.rate,
        releaseDate: movie.releaseDate,
        synopsis: movie.synopsis,
        title: movie.title
      }
    })
  }

  submit():void {
    if (this.newMovie === undefined || this.newMovie.title === '' || this.newMovie.director === '' || this.newMovie.synopsis === '' || this.newMovie.releaseDate === undefined) return;
    console.log("film édité");
    this.moviesService.editMovie(this.newMovie);
    this.router.navigate(['/movies']);
  }

  formatedDate = (date : Date) => {
    let day : string = date.getDate().toString();
    if (day.length === 1) day = "0" + day;
    let month : string = date.getMonth() + 1 + "";
    if (month.length === 1) month = "0" + month;
    return date.getFullYear() + "-" + month + "-" + day;
  }
}
