import Elysia, { Static, t } from "elysia"
import { _pagination, CreatePagination } from "./pagination.type"


export const MovieSchema = t.Object({
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    // genre_ids: t.Array(t.Numeric()),
})


export const MoviePostSchema = t.Object({
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    // genre_ids: t.Array(t.Numeric()),
})
const _moviePagination = t.Object({
    ..._pagination.properties,
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    // genre_ids: t.Array(t.Numeric()),
})
export const _moviePaginator = CreatePagination(MovieSchema, _moviePagination)

export const MovieDto = new Elysia().model({
    pagination: t.Optional(_moviePagination),
    // updateProfile: _updateProfile,
    users: _moviePagination,
    user: MovieSchema,
    target_id: t.Object({ target_id: t.String() }),
})

export type moviePaginator = Static<typeof _moviePaginator>
export type moviePagination = Static<typeof _moviePagination>
export type Movie = typeof MovieSchema.static
export type MoviePostData = typeof MoviePostSchema.static
