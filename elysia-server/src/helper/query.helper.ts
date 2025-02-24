import mongoose from "mongoose"
import { IMovieDocument } from "../interface/movie.interface"
import { moviePagination } from "../types/movie.type"

export const QueryHelper = {

    parseUserQuery: function (query: moviePagination): mongoose.FilterQuery<IMovieDocument>[] {
        const filter: mongoose.FilterQuery<IMovieDocument>[] = []

        // Filter by title
        if (query.title) {
            const regEx = new RegExp(`\\b${query.title.trim()}`, 'i')
            filter.push({ title: { $regex: regEx } })
        }

        // Filter by overview
        if (query.overview) {
            const regEx = new RegExp(`\\b${query.overview.trim()}`, 'i')
            filter.push({ overview: { $regex: regEx } })
        }

        // Filter by release_date
        if (query.release_date) {
            filter.push({ release_date: query.release_date })
        }

        return filter
    },

}
