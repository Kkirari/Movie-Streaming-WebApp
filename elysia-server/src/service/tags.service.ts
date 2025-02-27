import { tags } from "../models/tags.model";
import { tagPostData, Tags } from "../types/tags.type";


export const TagService = {

    createTags: async function (newTagData: tagPostData): Promise<Tags> {
        const existingTags = await tags.findOne({ title: newTagData.name }).exec();
        if (existingTags) throw new Error(`${newTagData.name} already exists`);

        const newMovie = new tags(newTagData);
        await newMovie.save();

        return newMovie.toTags();
    },

    get: async function (): Promise<Tags[]> {
        const docs = await tags.find().exec();
        return docs.map(doc => doc.toTags());
    },

    deleteTagsById: async function (id: string): Promise<void> {
        const result = await tags.findByIdAndDelete(id).exec();
        if (!result) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
    }
}