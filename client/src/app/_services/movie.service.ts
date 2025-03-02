import { Injectable, NgModule } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, Observable } from 'rxjs'
import { Movie } from '../_model/movie.model';
import { Tags } from '../_model/tags.model';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private baseApiUrl = 'https://localhost:8000/api/movies';
    private TagsBaseApiUrl = 'https://localhost:8000/api/tags';

    constructor(private http: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.baseApiUrl + '/get')
    }
    getTags(): Observable<Tags[]> {
        return this.http.get<Tags[]>(this.TagsBaseApiUrl + '/get')
    }

    async postTags(tag: Tags): Promise<string> {
        try {
            const url = `${this.TagsBaseApiUrl}/upload-tags`;
            const response = this.http.post<{ message: string }>(url, tag);
            const data = await firstValueFrom(response);
            console.log('Tag added successfully:', data);
            return 'Success';
        } catch (error: any) {
            console.error('Error adding tag:', error);
            return error?.error?.message || 'Unknown error occurred';
        }
    }

    async postMovie(movie: Movie): Promise<string> {
        try {
            const url = this.baseApiUrl + '/upload-movie';
            const response = this.http.post<{ movie: Movie }>(url, movie);
            const data = await firstValueFrom(response);
            console.log('Movie added successfully:', data);
            return 'Success';
        } catch (error: any) {
            console.error('Error adding movie:', error);
            return error?.error?.message || 'Unknown error occurred';
        }
    }


}
