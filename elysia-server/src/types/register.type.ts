import { t } from "elysia"

export const _register = t.Object({
    username: t.String(),
    password: t.String(),

})