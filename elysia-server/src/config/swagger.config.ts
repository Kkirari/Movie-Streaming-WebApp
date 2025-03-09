import swagger from "@elysiajs/swagger";

export const SwaggerConfig = swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: "TinnerAppAPI",
            version: "Beta 0.0.1"
        }
    }
})