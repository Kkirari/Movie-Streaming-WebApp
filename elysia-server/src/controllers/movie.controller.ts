import { Elysia, t } from "elysia"
import { movieSchema, moviePostSchema, Movie, MoviePostData, MovieDto, _updateMovie } from "../types/movie.type"
import { MovieService } from "../service/movie.service";
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleware";
import { tagsSchema } from "../types/tags.type";

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
            detail: { summary: "Create a new movie" },

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
        params: t.Object({ id: t.String() }),

    })

    .patch("/update/:id", async ({ params, body, set }) => {
        try {
            const updatedMovie = await MovieService.updateMovieById(params.id, body);
            return {
                message: `Movie "${updatedMovie.title}" updated successfully`,
                movie: updatedMovie
            };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to update movie");
        }
    }, {
        detail: { summary: "Update a movie by ID" },
        params: t.Object({ id: t.String() }),
        body: _updateMovie,
        response: t.Object({
            message: t.String(),
            movie: movieSchema
        }),
    })


    .post(
        "/add-tags/:id",
        async ({ params, body, set }) => {
            try {
                const { id } = params;
                const { tags } = body;

                // แปลง tags จาก object เป็น array ของชื่อแท็ก
                const tagNames = tags.map(tag => tag.name);

                // เรียกใช้งาน Service
                const updatedMovie = await MovieService.addTagsToMovies(tagNames, id);

                return {
                    message: `Tags added to movie "${updatedMovie.title}" successfully`,
                    movie: updatedMovie
                };
            } catch (error) {
                set.status = 400;
                throw new Error(error instanceof Error ? error.message : "Failed to add tags to movie");
            }
        },
        {
            detail: { summary: "Add tags to a movie by ID" },
            params: t.Object({ id: t.String() }),
            body: t.Object({
                tags: t.Array(tagsSchema) // ยอมรับ array ของ { id, name }
            }),
            response: t.Object({
                message: t.String(),
                movie: movieSchema
            })
        }
    )



