import Elysia, { Static, t } from "elysia"
import { _pagination, CreatePagination } from "./pagination.type"
import { tagsSchema } from "./tags.type"


export const movieSchema = t.Object({
    id: t.String(),
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    trailer_path: t.Optional(t.String()),
    tags: t.Optional(t.Array(t.String())) // รับเป็น string[] แทน ObjectId[]
});



export const moviePostSchema = t.Object({
    id: t.Optional(t.String()),
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    trailer_path: t.Optional(t.String()),
    tags: t.Optional(t.Array(tagsSchema))
})
const _moviePagination = t.Object({
    ..._pagination.properties,
    title: t.String(),
    overview: t.String(),
    release_date: t.String(),
    poster_path: t.String(),
    tags: t.Optional(t.Array(tagsSchema))
})
export const _moviePaginator = CreatePagination(movieSchema, _moviePagination)

export const MovieDto = new Elysia().model({
    pagination: t.Optional(_moviePagination),
    // updateProfile: _updateProfile,
    users: _moviePagination,
    user: movieSchema,
})

export const _updateMovie = t.Omit(moviePostSchema, ['id'])

export type moviePaginator = Static<typeof _moviePaginator>
export type moviePagination = Static<typeof _moviePagination>
export type Movie = typeof movieSchema.static
export type MoviePostData = typeof moviePostSchema.static
export type UpdateMovie = Static<typeof _updateMovie>
