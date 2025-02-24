import mongoose from "mongoose";
import { IMovieDocument, IMovieModel } from "../interface/movie.interface";
import { MoviePostData } from "../types/movie.type";

const schema = new mongoose.Schema<IMovieDocument, IMovieModel>(
    {
        title: { type: String, required: true, unique: true },
        overview: { type: String, required: true },
        release_date: { type: String, required: true },
        poster_path: { type: String, required: true },
        // genre_ids: { type: [Number], required: true },
    },
);

// **Method: แปลงเป็น Movie Type**
schema.methods.toMovie = function (): MoviePostData {
    return {
        title: this.title,
        overview: this.overview,
        release_date: this.release_date,
        poster_path: this.poster_path,
        // genre_ids: this.genre_ids,
    };
};

schema.statics.findByTitle = async function (
    title: string
): Promise<IMovieDocument | null> {
    return await this.findOne({ title }).exec();
};

schema.statics.createMovie = async function (
    movieData: MoviePostData
): Promise<IMovieDocument> {
    const newMovie = new this(movieData);
    await newMovie.save();
    return newMovie;
};

export const movie = mongoose.model<IMovieDocument, IMovieModel>(
    "Movie",
    schema
);
