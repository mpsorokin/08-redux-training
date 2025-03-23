import { configureStore } from '@reduxjs/toolkit'
import { usersSlice} from "../modules/users/users.slice.ts";
import { countersReducer } from "../modules/counters/counters.slice.ts";
import {baseApi} from "../shared/api.ts";
//import { api } from "../shared/api.ts";

export const extraArgument = {
    //api,
}

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        //getDefaultMiddleware({ thunk: { extraArgument } })
        getDefaultMiddleware().concat(
            baseApi.middleware,
        )
})