import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/movie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/movies"

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  getMovie(id:number) : Observable<Movie> {
    return this.httpClient.get<Movie>(this.url + "/" + id);
  }

  addMovie(movie:Movie) {
    return this.httpClient.post<Movie>(this.url, movie);
  }

  editMovie(movie:Movie) {
    if (movie.id === undefined) return;
    return this.httpClient.put<Movie>(this.url + "/" + movie.id, movie);
  }

  deleteMovie(movie:Movie) {
    if (movie.id === undefined) return;
    return this.httpClient.delete<void>(this.url + "/" + movie.id);
  }
}
