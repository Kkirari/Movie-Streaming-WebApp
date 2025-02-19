import { Elysia } from "elysia"
import { MovieSchema, MoviePostSchema, Movie, MoviePost } from "../types/movie.type"

const movies: Movie[] = []

export const MovieController = new Elysia({ prefix: "/api/movies" })

    .post(
        "/movie",
        ({ body }: { body: MoviePost }) => {
            const newMovie: Movie = {
                id: movies.length + 1,
                ...body
            }

            movies.push(newMovie)
            return newMovie
        },
        {
            body: MoviePostSchema,
            response: MovieSchema,
        }
    )
