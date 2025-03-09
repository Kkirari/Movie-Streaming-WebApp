import Elysia, { Static, t } from "elysia"

export const tagsSchema = t.Object({
    id: t.Optional(t.String()),
    name: t.String(),
})
export const tagPostSchema = t.Object({
    id: t.Optional(t.String()),
    name: t.String(),
})
export type Tags = typeof tagsSchema.static
export type tagPostData = typeof tagPostSchema.static

export const tagsDto = new Elysia().model({
    tags_id: t.Object({ tags_id: t.String() }),
    tag: tagsSchema,
    tags: t.Array(tagsSchema)
})
export const _updateTags = t.Omit(tagsSchema, ['id'])
export type UpdateTags = Static<typeof _updateTags>