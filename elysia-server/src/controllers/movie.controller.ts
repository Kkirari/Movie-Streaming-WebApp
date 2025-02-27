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

    .get('/get_id/:id', async ({ params, set }) => {
        try {
            const movie = await MovieService.getById(params.id);

            if (!movie) {
                set.status = 404;
                throw new Error("Movie not found");
            }

            return {
                message: `Movie "${movie.title}" fetched successfully`,
                movie: movie
            };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to get movie");
        }
    }, {
        detail: { summary: "Get movie by ID" },
        params: t.Object({ id: t.String() }),
        response: t.Object({
            message: t.String(),
            movie: movieSchema
        })
    })

    .delete("/delete/:id", async ({ params, set }) => {
        try {
            const movieToDelete = await MovieService.getById(params.id);

            if (!movieToDelete) {
                set.status = 404;
                throw new Error("Movie not found");
            }

            await MovieService.deleteById(params.id);

            return { message: `Movie "${movieToDelete.title}" deleted successfully` };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to delete movie");
        }
    }, {
        detail: { summary: "Delete a movie by ID" },
        params: t.Object({ id: t.String() })
    });


