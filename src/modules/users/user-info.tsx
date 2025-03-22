import {UserId, usersSlice} from "./users.slice.ts";
import { useAppSelector } from "../../store.ts";
import {useNavigate, useParams} from "react-router-dom";

export function UserInfo() {
    const navigate = useNavigate();
    const { userId = '1' } = useParams<{userId: UserId}>();
    const user = useAppSelector(state => usersSlice.selectors.selectUserById(state, userId));

    const handleBackButtonClick = () => {
        //dispatch(usersSlice.actions.selectRemove())
        navigate("/users");
    };

    console.log('user info' )
    console.log(user)

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
        </div>
    );
}