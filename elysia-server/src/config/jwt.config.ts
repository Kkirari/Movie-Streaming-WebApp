import jwt from "@elysiajs/jwt";

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'test secret for the project',
    exp: '1d'
})