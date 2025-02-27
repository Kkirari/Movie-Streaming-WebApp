import { Elysia, t } from "elysia"
import { movieSchema, moviePostSchema, Movie, MoviePostData, MovieDto } from "../types/movie.type"
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
            body: moviePostSchema,
            response: movieSchema,
            detail: { summary: "Create a new movie" }
        }
    )

    .get('/get', async () => {
        return await MovieService.get();
    }, {
        detail: { summary: "Get all movies" },
        response: t.Array(movieSchema)
    })

    .delete("/delete/:id", async ({ params, set }) => {
        try {
            await MovieService.deleteById(params.id);
            return { message: "Movie deleted successfully" };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to delete movie");
        }
    }, {
        detail: { summary: "Delete a movie by ID" },
        params: t.Object({ id: t.String() })
    });

