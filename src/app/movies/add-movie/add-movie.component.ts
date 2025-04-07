import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Movie} from "../../models/movie";
import {FormsModule} from "@angular/forms";
import {MoviesService} from "../../services/movies.service";
import {ToastComponent} from "../../toast/toast.component";
import {ToastService} from "../../services/toast.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    FormsModule,
    ToastComponent
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }
  show: boolean = false;
  constructor(private toastr: ToastrService) {}

  addMovie():void {
    if (this.movie.title === '' || this.movie.director === '' || this.movie.synopsis === '') {
      this.toastr.error('Erreur', 'Remplissez tous les champs avant de quitter');
      return;
    }
    console.log("film ajouté");
    this.moviesService.addMovie(this.movie);
    this.router.navigate(['/movies']).then(() => {
      this.toastr.success('Succès', 'Film ajouté');
    });
  }
}
