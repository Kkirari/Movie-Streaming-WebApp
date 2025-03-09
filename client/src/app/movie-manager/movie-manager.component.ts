import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core'; // เพิ่ม ChangeDetectorRef
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MovieService } from '../_services/movie.service';
import { Movie } from '../_model/movie.model';
import { Tags } from '../_model/tags.model';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-manager',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  templateUrl: './movie-manager.component.html',
  styleUrls: ['./movie-manager.component.css'],
})
export class MovieManagerComponent implements OnInit {
  movies: Movie[] = [];
  tags: Tags[] = [];
  pagedMovies: Movie[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  currentPage = 0;

  movieForm: FormGroup;
  movieUpdateForm: FormGroup;
  tagForm: FormGroup;
  tagUpdateForm: FormGroup;

  errorFormServer: string | null = null;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef, // เพิ่ม ChangeDetectorRef
    private fb: FormBuilder // ใช้ FormBuilder เพื่อสร้างฟอร์ม
  ) {

    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      release_date: ['', Validators.required],
      poster_path: ['', Validators.required],
      trailer_path: ['', Validators.required],
      tags: [[]], // เก็บแท็กเป็น array
    });
    this.movieUpdateForm = this.fb.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      release_date: ['', Validators.required],
      poster_path: ['', Validators.required],
      trailer_path: ['', Validators.required],
      tags: [[]], // เก็บแท็กเป็น array
    })
    this.tagForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.tagUpdateForm = this.fb.group({
      name: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadMovies();
    this.loadTags();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data || [];
        this.updatePagedMovies();
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      },
    });
  }
  loadTags(): void {
    this.movieService.getTags().subscribe({
      next: (data) => {
        this.tags = data || [];
        this.updatePagedMovies();
      },
      error: (err) => {
        console.error('Error fetching tags:', err);
      },
    })
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedMovies();
  }

  private updatePagedMovies(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedMovies = this.movies.slice(start, end);
    this.cdr.detectChanges();
  }
  toggleMode() {
    this.updateForm()
  }

  updateForm() {

  }

  async onSubmit() {
    if (this.tagForm.invalid) {
      alert('Please enter a tag name.');
      return;
    }
    try {
      const response = await this.movieService.postTags(this.tagForm.value);
      if (response === 'Success') {
        this.tagForm.reset();
        this.loadTags();
      } else {
        this.errorFormServer = response;
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      this.errorFormServer = 'Failed to add tag.';
    }
  }



  async deleteMovie(movieId: string): Promise<void> {
    try {
      const response = await this.movieService.deleteMovie(movieId);
      if (response === 'Success') {
        // ลบหนังออกจาก movies array
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        // อัปเดต pagedMovies โดยไม่ต้องโหลดใหม่
        this.updatePagedMovies();
        this.errorFormServer = null;
      } else {
        this.errorFormServer = response;
      }
    } catch (error) {
      console.error('error:', error);
      this.errorFormServer = 'error tryagain';
    }
  }

  async addMovie(): Promise<void> {
    if (this.movieForm.invalid) {
      alert('Please enter a movie name.');
      return;
    }
    try {
      const response = await this.movieService.postMovie(this.movieForm.value);
      if (response === 'Success') {
        this.movieForm.reset();
        this.loadMovies();
      } else {
        this.errorFormServer = response;
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      this.errorFormServer = 'Failed to add movie.';
    }
  }

  updateTag(Tags_id: string) {
    this.movieService.updateTags(this.tagUpdateForm.value, Tags_id)
  }
  updateMovie(Movie_id: string) {
    this.movieService.updateMovie(this.movieUpdateForm.value, Movie_id)
  }
  async deleteTags(tags_id: string): Promise<void> {
    try {
      const response = await this.movieService.deleteTags(tags_id);
      if (response === 'Success') {
        // แก้ไขให้ filter this.tags แทน this.movies และแก้ชื่อตัวแปรให้ถูกต้อง
        this.tags = this.tags.filter(tag => tag.id !== tags_id);
        // อัปเดต pagedMovies
        this.updatePagedMovies();
        this.errorFormServer = null;
      } else {
        this.errorFormServer = response;
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      this.errorFormServer = 'Failed to delete tag.';
    }
  }




  selectedTag: any = null;
  selectedMovie: any = null;
}
