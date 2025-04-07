import {Component, inject, Input} from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieComponent } from '../movie/movie.component';
import {MoviesService} from "../../services/movies.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MovieComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
  private readonly moviesService = inject(MoviesService);
  moviesRequest: Observable<Movie[]> = this.moviesService.getMovies();
  movies : Movie[] |undefined;

  constructor() {
    this.moviesRequest.subscribe((movies) => {this.movies = movies})
  }

  currentSlideIndex = 0;

  get slides(): Movie[][] {
    if (!this.movies) return [];
    const slides: Movie[][] = [];
    for (let i = 0; i < this.movies.length; i += 5) {
      slides.push(this.movies.slice(i, i + 5));
    }
    return slides;
  }

  nextSlide(): void {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }
}
