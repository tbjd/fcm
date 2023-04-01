import type {LinksFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: stylesUrl}];
};

export default function IndexRoute() {
    return (
        <div >
            <div>
                <h1>
                    Log in / register
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="teams">By pass</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
