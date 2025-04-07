import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
  movie : Movie | null = null;
  private readonly moviesService : MoviesService = inject(MoviesService);
  private readonly router : Router = inject(Router);
  newMovie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }
  previousDate: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.movie = this.moviesService.getMovie(this.id);
    console.log(this.id)
    console.log(this.moviesService.getMovie(this.id))
    if (this.movie === null) return;
    this.newMovie.id = this.movie.id;
    this.newMovie.title = this.movie.title;
    this.newMovie.director = this.movie.director;
    this.newMovie.releaseDate = this.movie.releaseDate;
    this.newMovie.synopsis = this.movie.synopsis;
    this.previousDate = this.formatedDate(this.movie.releaseDate);
  }

  submit():void {
    if (this.newMovie === null) return;
    if (this.newMovie.title === '' || this.newMovie.director === '' || this.newMovie.synopsis === '' || this.previousDate === '') return
    console.log(this.previousDate);
    this.newMovie.releaseDate = new Date(this.previousDate);
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
