import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MoviesComponent} from "./movies/movies.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";
import {EditMovieComponent} from "./movies/edit-movie/edit-movie.component";
import {ShowMovieComponent} from "./movies/show-movie/show-movie.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'movies/add', component: AddMovieComponent},
  { path: 'movies/edit/:id', component: EditMovieComponent},
  { path: 'movies/show/:id', component: ShowMovieComponent},
  { path: 'login', component: LoginComponent}
];
