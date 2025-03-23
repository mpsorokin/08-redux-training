import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { User, usersSlice } from "./users.slice.ts";
import { fetchUsers } from "./model/fetch-users.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAppStore } from "../../shared/redux.ts";
import {usersApi} from "./api.ts";

export function UserList() {
    const dispatch = useAppDispatch();
    const appStore = useAppStore();
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");
    const ids = useAppSelector((state) => state.users.ids);
    const entities = useAppSelector((state) => state.users.entities);
    //const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

    const { data: users, isLoading } = usersApi.useGetUsersQuery();
    //console.log(users)

    const sortedUsers = useMemo(() => {
        return [...(users ?? [])]?.sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
    }, [sortType, users]);

    /*useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, appStore])*/

    //const sortedUsers = useAppSelector((state) => selectSortedUsers(state, sortType));

    /*const sortedUsers = useMemo(() => ids
        .map((id) => entities[id])
        .sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }), [ids, entities, sortType]);*/

    if(isLoading) {
        return <div> ...Loading </div>
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-between">
                <div className="flex flex-row items-center">
                    <button
                        onClick={() => setSortType("asc")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                    >
                        Asc
                    </button>
                    <button
                        onClick={() => setSortType("desc")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                    >
                        Desc
                    </button>
                </div>
                <ul className="list-none">
                    {sortedUsers.map((user: any) => (
                        <UserListItem
                            user={user}
                            key={user.id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserList;

// memo optimizes not ot rerender
const UserListItem = memo(function UserListItem({ user }: { user: User }) {
    //console.log('render userlist item', user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserClick = () => {
        //dispatch(usersSlice.actions.selected({ userId: user.id }))
        navigate('/users/' + user.id);
    };
    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span className="hover:underline cursor-pointer">{user.name}</span>
        </li>
    );
});