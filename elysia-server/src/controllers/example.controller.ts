import Elysia from "elysia";

export const exampleController = new Elysia({
    prefix: "/api/example",
    tags: ['Example API']
})

    .get('/', () => {
        return {
            id: 101,
            content: "hello"
        }
    })