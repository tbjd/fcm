import type {LinksFunction, LoaderArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Link} from "@remix-run/react";

import stylesUrl from "~/styles/index.css";
import {getUserId} from "~/utils/session.server";

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesUrl}];
};

export const loader = async ({request}: LoaderArgs) => {
    const userId = await getUserId(request);
    if (userId) {
        return redirect("/teams")
    }
    return {}
};

export default function IndexRoute() {
    return (
        <div>
            <div>
                <h1>
                    <Link to="login">Log in / register</Link>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="teams">Continue as guess</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
