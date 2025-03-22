import {UserId, usersSlice} from "./users.slice.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteUser} from "./model/delete-user.ts";
import {useAppSelector} from "../../shared/redux.ts";

export function UserInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId = '1' } = useParams<{userId: UserId}>();
    const user = useAppSelector(state => usersSlice.selectors.selectUserById(state, userId));

    const handleBackButtonClick = () => {
        //dispatch(usersSlice.actions.selectRemove())
        navigate("/users");
    };

    const handleDeleteButtonClick = () => {
        dispatch(deleteUser(userId));
        navigate("/users");
    }

    return (

        <div className="flex flex-col items-center">
            <button
                onClick={handleBackButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
            >
                Back
            </button>
            <h2 className="text-3xl">{user?.name}</h2>
            <p className="text-xl">{user?.description}</p>
            <button
                onClick={handleDeleteButtonClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md"
            >Delete</button>
        </div>
    );
}