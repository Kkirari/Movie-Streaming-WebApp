
import mongoose, { RootFilterQuery } from "mongoose";
import { movie } from "../models/movie.model";
import { Movie, moviePagination, moviePaginator, MoviePostData } from "../types/movie.type";
import { IMovieDocument } from "../interface/movie.interface";
import { QueryHelper } from "../helper/query.helper";

export const MovieService = {
    createNewMovie: async function (newMovieData: MoviePostData): Promise<Movie> {
        const user = await movie.findOne({ title: newMovieData.title }).exec()
        if (user)
            throw new Error(`${newMovieData.title} already exists`)
        const newUser = await movie.createMovie(newMovieData)
        return newUser.toMovie()
    },
    get: async function (pagination: moviePagination): Promise<moviePaginator> {
        console.log("Received query:", pagination)  // Debug query ที่เข้ามา

        let filter: RootFilterQuery<IMovieDocument> = {
            $and: QueryHelper.parseUserQuery(pagination)
        }

        const query = movie.find(filter).sort({ last_active: -1 })
        const skip = pagination.pageSize * (pagination.currentPage - 1)
        query.skip(skip).limit(pagination.pageSize)

        const [docs, total] = await Promise.all([
            query.exec(),
            movie.countDocuments(filter).exec()
        ])

        pagination.length = total
        console.log("Final pagination:", pagination)  // Debug pagination ก่อน return

        return {
            pagination: pagination,
            items: docs.map(doc => doc.toMovie())
        }
    },


    getByUsername: async function (username: string): Promise<Movie> {
        const user = await movie.findOne({ username }).exec()
        if (user)
            return user.toMovie()
        throw new Error(`"${username}" is not found!`)
    },
};
