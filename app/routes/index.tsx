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
        <div className="container mx-auto">
            <h1>FC Manager</h1>
            <div>
                <Link to="login">Log in / register</Link>
            </div>
            <div>
                <Link to="teams">Continue as guess</Link>
            </div>
        </div>
    );
}
