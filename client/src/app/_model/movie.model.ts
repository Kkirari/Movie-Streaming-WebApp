import { Tags } from "./tags.model"

export interface Movie {
    id?: string
    title: string
    overview: string
    release_date: string
    poster_path: string
    trailer_path: string
    tags: Tags[]
}