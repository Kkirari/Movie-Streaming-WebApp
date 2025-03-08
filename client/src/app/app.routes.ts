import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'



export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: 'movie-list',
        loadComponent: () => import('./movie-list/movie-list.component').then(c => c.MovieListComponent)
    },
    {
        path: 'movie-manager',
        loadComponent: () => import('./movie-manager/movie-manager.component').then(c => c.MovieManagerComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },



]