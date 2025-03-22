import { UserId, usersSlice } from "../users.slice.ts";
import { AppThunk} from "../../../store.ts";
import { fetchUsers } from "./fetch-users.ts";

export const deleteUser = (userId: UserId): AppThunk =>
    async (dispatch, _, { api }) => {

        dispatch(usersSlice.actions.deleteUserPending());

        try {
            await api.deleteUser(userId);
            dispatch(usersSlice.actions.deleteUserSuccess({ userId }));

            dispatch(fetchUsers(true));
        } catch (e) {
            dispatch(usersSlice.actions.deleteUserFailed());
        }
    }