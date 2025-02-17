import Elysia, { Static, t } from "elysia";

export const _login = t.Object({
    username: t.String(),
    password: t.String()
})
export const _register = t.Object({
    username: t.String(),
    password: t.String(),
})

export const _user = t.Object({
    ...t.Omit(_login, ['password']).properties

})
export const _accountToken = t.Object({
    token: t.String(),
    user: _user
})

export const AccountDto = new Elysia().model({
    register: _register,
    login: _login,
    account: _accountToken
})

export type user = Static<typeof _user>
export type register = Static<typeof _register>
export type login = Static<typeof _login>
