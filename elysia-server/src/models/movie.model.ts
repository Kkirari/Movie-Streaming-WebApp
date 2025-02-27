import mongoose from "mongoose";
import { IMovieDocument, IMovieModel } from "../interface/movie.interface";
import { MoviePostData } from "../types/movie.type";
import { tags } from "./tags.model";

const schema = new mongoose.Schema<IMovieDocument, IMovieModel>(
    {
        title: { type: String, required: true, unique: true },
        overview: { type: String, required: true },
        release_date: { type: String, required: true },
        poster_path: { type: String, required: true },
        trailer_path: { type: String, required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
    },
);


schema.methods.toMovie = function (): MoviePostData {

    const movieTags = Array.isArray(this.tags)
        ? this.tags.map(tags => (new tags(tags)).toTags())
        : undefined

    return {
        id: this._id.toString(),
        title: this.title,
        overview: this.overview,
        release_date: this.release_date,
        poster_path: this.poster_path,
        trailer_path: this.trailer_path,
        tags: movieTags
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
