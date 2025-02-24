import mongoose from "mongoose";
import { Movie, MoviePostData } from "../types/movie.type";

type MovieWithoutId = Omit<Movie, "id">;

export interface IMovieDocument extends mongoose.Document, MovieWithoutId {
    id: mongoose.Types.ObjectId;
    created_at?: Date;
    toMovie: () => Movie;
}

export interface IMovieModel extends mongoose.Model<IMovieDocument> {
    createMovie: (NewMovieData: MoviePostData) => Promise<IMovieDocument>;
}
