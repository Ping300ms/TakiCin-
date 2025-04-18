import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Task} from "zone.js/lib/zone-impl";
import {ToastrService} from "ngx-toastr";

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

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
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
    if (this.newMovie === undefined || this.newMovie.title === '' || this.newMovie.director === '' || this.newMovie.synopsis === '' || this.newMovie.releaseDate === undefined) {
      this.toastr.error('Remplissez tous les champs avant de quitter.');
      return;
    };
    console.log("film édité");
    this.moviesService.editMovie(this.newMovie);
    this.router.navigate(['/movies']).then(() => {
      this.toastr.success('Film mis à jour!');
    });
  }
}
