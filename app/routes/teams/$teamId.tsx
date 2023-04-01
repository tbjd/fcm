import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData} from "@remix-run/react";

export const loader = async ({params}: LoaderArgs) => {
    /*const joke = await db.joke.findUnique({
        where: { id: params.jokeId },
    });*/
    const team = {id: params.teamId, name: "Mad Scientist"}
    if (!team) {
        throw new Error("Team not found");
    }
    return json({team});
};

export default function TeamRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{data.team.name}</h1>
            <Outlet/>
        </div>
    );
}
