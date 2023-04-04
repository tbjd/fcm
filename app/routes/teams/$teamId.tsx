import {NavLink, Outlet} from "@remix-run/react";


export default function TeamRoute() {

    return (
        <div>
            <h1>
                <NavLink to="..">Teams/</NavLink>
            </h1>
            <Outlet/>
        </div>
    );
}
