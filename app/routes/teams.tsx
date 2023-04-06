import type {LinksFunction, LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData,} from "@remix-run/react";

import stylesUrl from "~/styles/teams.css";
import {getUser} from "~/utils/session.server";

export const links: LinksFunction = () => {
  return [{
    rel: "stylesheet",
    href: stylesUrl
  }];
};

export const loader = async ({request}: LoaderArgs) => {
  const user = await getUser(request);

  return json({
    user,
  });
};

export default function TeamsRoute() {
  const data = useLoaderData<typeof loader>();
  return (
      <div>
        <header>
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
            {data.user ? (
                <div>
                  <span>{`Hi ${data.user.username}`}</span>
                  <form action="/logout" method="post">
                    <button type="submit">
                      Logout
                    </button>
                  </form>
                </div>
            ) : (
                <Link to="/login">Login</Link>
            )}
          </div>
        </header>
        <main>
          <div>
            <Outlet/>
          </div>
        </main>
      </div>
  );
}
