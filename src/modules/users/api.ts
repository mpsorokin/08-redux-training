import { baseApi } from "../../shared/api.ts";
import {User, UserId} from "./users.slice.ts";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getUsers: create.query<User[], void>({
            query: () => '/users',
        }),
        getUser: create.query<User, UserId>({
            query: (userId) => `/users/${userId}`,
        }),
        deleteUser: create.mutation<void, UserId>({
            query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
        })
    }),
    overrideExisting: true
})

export const {useGetUsersQuery} = usersApi