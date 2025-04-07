import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/movies"
  private idCount: number = 0;
  private movies: Movie[] = [
    {
      id: this.idCount++,
      title: 'Yann vs the world',
      releaseDate: new Date(),
      director: 'Yann Lemétayer',
      synopsis: 'Yann renverse les gouvernement et met fin à la troisième guerre mondiale'
    }
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id:number) : Movie | null {
    let index = this.getIndex(id);
    if (index === -1) return null;
    return this.movies[index];
  }

  addMovie(movie:Movie) {
    movie.id = this.idCount++;
    this.movies.push(movie);
  }

  editMovie(movie:Movie) {
    if (movie.id === undefined) return;
    let index : number = this.getIndex(movie.id);
    this.movies[index] = movie;
  }

  private getIndex(id:number):number {
    for (let i = 0; i < this.movies.length; i++) {
      let j : number | undefined = this.movies[i].id;
      if (j === undefined) continue;
      if (j.toString() === id.toString()) return i;
    }
    return -1;
  }

  deleteMovie(movie:Movie) {
    if (movie.id === undefined) return;
    let index : number = this.getIndex(movie.id);
    if (index === -1) return;
    this.movies.splice(index, 1);
  }
}
