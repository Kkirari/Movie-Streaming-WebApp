import { Injectable, NgModule } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Movie {
    title: string
    overview: string
    release_date: string
    poster_path: string
}

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private apiUrl = 'https://localhost:8000/api/movies/get';

    constructor(private http: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiUrl)
    }
}
