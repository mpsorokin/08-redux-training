import { createAppAsyncThunk} from "../../../shared/redux.ts";

/*
export const fetchUsers = (refetch?: boolean): AppThunk =>
    (dispatch, getState, { api }) => {
    // hack to read actual value from store to prevent double api server call
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

    if(!isIdle && !refetch) return;
    dispatch(usersSlice.actions.fetchUsersPending());
    api.getUsers()
        .then(users => {
            dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
            console.log(users);
        })
        .catch((error) => {
            console.log(error);
            dispatch(usersSlice.actions.fetchUsersFailed());
        })
}
*/

export const fetchUsers = createAppAsyncThunk(
    "users/fetchUsers",
    async ({ refetch }: { refetch?: boolean } = {}, thunkAPI) => {
        return thunkAPI.extra.api.getUsers();
    }
);