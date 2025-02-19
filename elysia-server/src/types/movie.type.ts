import { t } from "elysia"


export const MovieSchema = t.Object({
    id: t.Numeric(),
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    backdrop_path: t.String(),
    vote_average: t.Numeric(),
    vote_count: t.Numeric(),
    genre_ids: t.Array(t.Numeric()),
})


export const MoviePostSchema = t.Object({
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    backdrop_path: t.String(),
    vote_average: t.Numeric(),
    vote_count: t.Numeric(),
    genre_ids: t.Array(t.Numeric()),
})


export type Movie = typeof MovieSchema.static
export type MoviePost = typeof MoviePostSchema.static
