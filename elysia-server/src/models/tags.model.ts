

import mongoose from "mongoose";
import { ITagsDocument, ITagsModel } from "../interface/tags.interface";
import { tagPostData } from "../types/tags.type";

const schema = new mongoose.Schema<ITagsDocument, ITagsModel>(
    {
        name: { type: String, required: true },
    },
);


schema.methods.toTags = function (): tagPostData {
    return {
        id: this._id.toString(),
        name: this.name,
    };
};

schema.statics.findByTitle = async function (
    title: string
): Promise<ITagsDocument | null> {
    return await this.findOne({ title }).exec();
};

schema.statics.createTags = async function (
    tagsData: tagPostData
): Promise<ITagsDocument> {
    const newTags = new this(tagsData);
    await newTags.save();
    return newTags;
};

export const tags = mongoose.model<ITagsDocument, ITagsModel>(
    "Tags",
    schema
);
