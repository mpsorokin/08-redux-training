import {createBrowserRouter, Link, Outlet, redirect} from "react-router-dom";
import UserList from "../modules/users/users-list.tsx";
import {Counter} from "../modules/counters/counters.tsx";
import {UserInfo} from "../modules/users/user-info.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="container p-5 flex flex-col gap-5">
                <header className="py-5 flex gap-4">
                    <Link to="users">users</Link>
                    <Link to="counters">counters</Link>
                </header>
                <Outlet />
            </div>
        ),
        children: [
            {
                index: true,
                loader: () => redirect('/users')
            },
            {
                path: 'users',
                element: <UserList />
            },
            {
                path: 'users/:userId',
                element: <UserInfo />
            },
            {
                path: 'counters',
                element: <Counter counterId="first" />
            }
        ]
    }
]);