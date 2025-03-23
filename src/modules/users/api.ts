import { baseApi } from "../../shared/api.ts";
import { User, UserId } from "./users.slice.ts";
import { z } from "zod";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})

export const usersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getUsers: create.query<User[], void>({
            query: () => '/users',
            providesTags: ['users', { type: 'users', id: 'listUsers' }],
            transformResponse: (res: unknown) => UserDtoSchema.array().parse(res)
        }),
        getUser: create.query<User, UserId>({
            query: (userId) => `/users/${userId}`,
            providesTags: (_, __ ,userId) => ['users', { type: 'users', id: userId }],
            transformResponse: (res: unknown) => UserDtoSchema.parse(res)
        }),
        deleteUser: create.mutation<void, UserId>({
            query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
            invalidatesTags: (_, __, userId) => [
                { type : 'users', id: 'listUsers'},
                { type : 'users', id: userId }
            ],
        })
    }),
    overrideExisting: true
})

export const {useGetUsersQuery} = usersApi