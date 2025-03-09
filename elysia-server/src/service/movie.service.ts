

import { MovieSchema } from "../models/movie.model";
import { Movie, MoviePostData, UpdateMovie } from "../types/movie.type";
import { Tags } from "../types/tags.type";


export const MovieService = {
    createNewMovie: async function (newMovieData: MoviePostData): Promise<Movie> {
        const existingMovie = await MovieSchema.findOne({ title: newMovieData.title }).exec();
        if (existingMovie) throw new Error(`${newMovieData.title} already exists`);

        const newMovie = new MovieSchema(newMovieData);
        await newMovie.save();

        return newMovie.toMovie();
    },

    get: async function (): Promise<Movie[]> {
        const docs = await MovieSchema.find().exec();
        return docs.map(doc => doc.toMovie());
    },


    getById: async function (ID: string): Promise<Movie> {
        const result = await MovieSchema.findById(ID).exec()
        if (!result) {
            throw new Error(`"${ID}" is not found!`)
        }
        return result.toMovie()
    },

    deleteById: async function (id: string): Promise<void> {
        const result = await MovieSchema.findByIdAndDelete(id).exec();
        if (!result) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
    },

    updateMovieById: async function (id: string, updateData: UpdateMovie): Promise<Movie> {
        const updatedMovie = await MovieSchema.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedMovie) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
        return updatedMovie.toMovie();
    },

    addTagsToMovies: async function (tags: string[], movie_id: string): Promise<Movie> {
        // Find the movie by ID
        const movie = await MovieSchema.findById(movie_id).exec();
        if (!movie) {
            throw new Error(`Movie with ID "${movie_id}" not found`);
        }

        // Add new tags to the existing tags (if any)
        const existingTags = movie.tags || [];
        const updatedTags = [...new Set([...existingTags, ...tags])]; // Ensure no duplicate tags

        // Update the movie with the new tags
        const updatedMovie = await MovieSchema.findByIdAndUpdate(
            movie_id,
            { $set: { tags: updatedTags } }
        ).exec();

        if (!updatedMovie) {
            throw new Error(`Failed to update movie with ID "${movie_id}"`);
        }

        return updatedMovie.toMovie();
    }

};
