import { configureStore, createSelector, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from "react-redux";
import { usersSlice} from "./modules/users/users.slice.ts";
import { countersReducer } from "./modules/counters/counters.slice.ts";
import { api } from "./shared/api.ts";

const extraArgument = {
    api,
}

export const store = configureStore({
    reducer: {
        counters: countersReducer,
        [usersSlice.name]: usersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } })
})

//store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
