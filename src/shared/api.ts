import { z } from "zod";
import {createApi, EndpointBuilder, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const baseUrl = "http://localhost:3000";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes: ["users"],
    endpoints: () => ({ }),
})

/*
export const api = {
    getUsers: () => {
        return fetch(`${baseUrl}/users`)
            .then(res => res.json())
            .then((res) => {
                return UserDtoSchema.array().parse(res)
        });
    },
    getUser: (id: string) => {
        return fetch(`${baseUrl}/users/${id}`).then(res => res.json()).then((res) => {
            return UserDtoSchema.parse(res)
        });
    },
    deleteUser: (id: string) => {
        return fetch(`${baseUrl}/users/${id}`, {
            method: "DELETE"
        }).then(res => res.json());
    }
}*/
