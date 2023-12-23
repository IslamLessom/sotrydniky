import { User } from '@prisma/client'
import { api } from './api'

export type UserData = Omit<User, 'id'> //Omit<User, 'id'> мы удалям обязательное поле id из User
type ResponseLoginData = User & { token: string } //нам будет приходить все что в юере и токен

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            }),

        }) //builder.mutation() - потому что мы делаем post запрос

    })
})
