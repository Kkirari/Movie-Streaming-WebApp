

import { movie } from "../models/movie.model";
import { Movie, MoviePostData } from "../types/movie.type";


export const MovieService = {
    createNewMovie: async function (newMovieData: MoviePostData): Promise<Movie> {
        const existingMovie = await movie.findOne({ title: newMovieData.title }).exec();
        if (existingMovie) throw new Error(`${newMovieData.title} already exists`);

        const newMovie = new movie(newMovieData);
        await newMovie.save();

        return newMovie.toMovie();
    },

    get: async function (): Promise<Movie[]> {
        const docs = await movie.find().exec();
        return docs.map(doc => doc.toMovie());
    },


    getByTitle: async function (username: string): Promise<Movie> {
        const user = await movie.findOne({ username }).exec()
        if (user)
            return user.toMovie()
        throw new Error(`"${username}" is not found!`)
    },

    deleteById: async function (id: string): Promise<void> {
        const result = await movie.findByIdAndDelete(id).exec();
        if (!result) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
    }



};
