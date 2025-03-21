import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export type User = {
    id: UserId;
    name: string;
    description: string;
};

export const initialUsersList: User[] = Array.from({ length: 3000 }, (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
}));

type UsersState = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
    selectedUserId: UserId | undefined;
}


const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
}


/*
export const selectSortedUsers = createAppSelector(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (_: AppState, sort: "asc" | "desc") => sort,
    (ids, entities, sort) => {
        return ids
            .map((id) => entities[id])
            .sort((a, b) => {
                if (sort === "asc") {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return a.name.localeCompare(b.name);
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    return b.name.localeCompare(a.name);
                }
            });
    }
);*/

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    selectors: {},
    reducers: {
        selected: (state, action: PayloadAction<{ userId: UserId }>) => {
            const { userId } = action.payload;

            return {
                ...state,
                selectedUserId: userId,
            }
        },
        selectRemove: (state) => {
            return {
                ...state,
                selectedUserId: undefined,
            }
        },
        stored: (state, action: PayloadAction<{ users: User[] }>) => {
            const { users } = action.payload;
            return {
                ...state,
                entities: users.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;}, {} as Record<UserId, User>),
                ids: users.map((user) => user.id),
            }
        }
    }
})