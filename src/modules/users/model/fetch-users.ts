import { usersSlice } from "../users.slice.ts";
import { AppThunk} from "../../../store.ts";

export const fetchUsers = (): AppThunk =>
    (dispatch, getState, { api }) => {
    // hack to read actual value from store to prevent double api server call
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

    if(!isIdle) return;
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