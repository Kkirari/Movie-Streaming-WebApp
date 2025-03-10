import Elysia, { t } from "elysia";
import { AuthMiddleWare } from "../middlewares/auth.middleware";
import { TagService } from "../service/tags.service";
import { _updateTags, tagPostSchema, tagsSchema } from "../types/tags.type";

export const TagsController = new Elysia({
    prefix: "/api/tags",
    tags: ["tags"]
})

    .use(AuthMiddleWare)


    .post(
        "/upload-tags",
        async ({ body, set }) => {
            try {
                const newTags = await TagService.createTags(body);
                return newTags;
            } catch (error) {
                set.status = 400;
                throw new Error(error instanceof Error ? error.message : "Failed to create Tags");
            }
        },
        {
            body: tagPostSchema,
            response: tagsSchema,
            detail: { summary: "Create a new Tags" },
        }
    )
    .get('/get', async () => {
        return await TagService.get();
    }, {
        detail: { summary: "Get all Tags" },
        response: t.Array(tagsSchema)
    })

    .delete("/delete/:id", async ({ params, set }) => {
        try {
            await TagService.deleteTagsById(params.id);
            return { message: "Tags deleted successfully" };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to delete Tags");
        }
    }, {
        detail: { summary: "Delete a Tags by ID" },
        params: t.Object({ id: t.String() })

    })

    .patch("/update/:id", async ({ params, body, set }) => {
        try {
            const updatedTags = await TagService.updateTagsById(params.id, body);
            return {
                message: `Tags "${updatedTags}" updated successfully`,
                tags: updatedTags
            };
        } catch (error) {
            set.status = 400;
            throw new Error(error instanceof Error ? error.message : "Failed to update tags");
        }
    }, {
        detail: { summary: "Update a tags by ID" },
        params: t.Object({ id: t.String() }),
        body: _updateTags,
        response: t.Object({
            message: t.String(),
            tags: tagsSchema
        }),
    })