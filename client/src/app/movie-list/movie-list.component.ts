import { Component, OnInit } from '@angular/core'
import { MovieService, Movie } from '../_services/movie.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [CommonModule],
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        console.log('Movies data received:', JSON.stringify(data, null, 2)) // ✅ Debug ดูข้อมูลที่ได้
        this.movies = [...data] // ✅ ใช้ Spread Operator บังคับให้ Angular อัปเดต
      },
      error: (err) => {
        console.error('Error fetching movies:', err)
      }
    })
  }
}