import { TagsSchema } from "../models/tags.model";
import { tagPostData, Tags, UpdateTags } from "../types/tags.type";


export const TagService = {

    createTags: async function (newTagData: tagPostData): Promise<Tags> {
        const existingTags = await TagsSchema.findOne({ title: newTagData.name }).exec();
        if (existingTags) throw new Error(`${newTagData.name} already exists`);

        const newMovie = new TagsSchema(newTagData);
        await newMovie.save();

        return newMovie.toTags();
    },

    get: async function (): Promise<Tags[]> {
        const docs = await TagsSchema.find().exec();
        return docs.map(doc => doc.toTags());
    },
    updateTagsById: async function (id: string, updateData: UpdateTags): Promise<Tags> {
        const updatedTags = await TagsSchema.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedTags) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
        return updatedTags.toTags();
    },

    deleteTagsById: async function (id: string): Promise<void> {
        const result = await TagsSchema.findByIdAndDelete(id).exec();
        if (!result) {
            throw new Error(`Movie with ID "${id}" not found`);
        }
    }
}