import mongoose from "mongoose";
import { tagPostData } from "../types/tags.type";


type TagsWithoutId = Omit<tagPostData, "id">;

export interface ITagsDocument extends mongoose.Document, TagsWithoutId {
    id: mongoose.Types.ObjectId;
    created_at?: Date;
    toTags: () => tagPostData;
}

export interface ITagsModel extends mongoose.Model<ITagsDocument> {
    createTags: (NewTagsData: tagPostData) => Promise<ITagsDocument>;
}
