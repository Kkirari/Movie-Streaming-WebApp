import { connect } from 'bun'
import moongose from 'mongoose'
const username = Bun.env.MONGO_DB_USERNAME || 'your-username'
const password = Bun.env.MONGO_DB_PASSWORD || 'your-password'
const db_name = Bun.env.MONGO_DB_NAME || 'movie_class_example'

const url = `mongodb + srv://${username}:${password}@databasemovie.uoziu.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const Database = {
    connect: async function () {
        try {
            await moongose.connect(url)
            console.log("---MongoDB connected---")

        } catch (error) {
            console.log("---MongoDB connection failed---")
            console.log("error", error)


        }
    }
}