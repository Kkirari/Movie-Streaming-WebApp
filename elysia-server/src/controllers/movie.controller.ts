import { Elysia, t } from "elysia"
import { MovieSchema, MoviePostSchema, Movie, MoviePostData, MovieDto } from "../types/movie.type"
import { MovieService } from "../service/movie.service";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export const MovieController = new Elysia({
    prefix: "/api/movies",
    tags: ["movies"]
})
    .use(AuthMiddleWare)
    .use(MovieDto)

    .post(
        "/upload-movie",
        async ({ body, set }) => {
            try {
                const newMovie = await MovieService.createNewMovie(body);
                return newMovie;
            } catch (error) {
                set.status = 400;
                throw new Error(error instanceof Error ? error.message : "Failed to create movie");
            }
        },
        {
            body: MoviePostSchema,
            response: MovieSchema,
            detail: { summary: "Create a new movie" }
        }
    )

    .get('/get', async () => {
        return await MovieService.get();
    }, {
        detail: { summary: "Get all movies" },
        response: t.Array(MovieSchema)
    })
