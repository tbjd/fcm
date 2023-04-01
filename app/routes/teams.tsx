import type { LinksFunction } from "@remix-run/node";
import {
    Link,
    Outlet,
} from "@remix-run/react";

import stylesUrl from "~/styles/teams.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};


export default function TeamsRoute() {

    return (
        <div>
            <header >
                <div>
                    <h1>
                        <Link
                            to="/"
                            title="FCM"
                            aria-label="FCM"
                        >
                            <span>FCM ⚽️</span>
                        </Link>
                    </h1>
                </div>
            </header>
            <main >
                <div>
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
