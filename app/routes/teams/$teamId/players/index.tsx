import {Link, useLoaderData} from "@remix-run/react";
import {db} from "~/utils/db.server";
import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";

export const loader = async ({params}: LoaderArgs) => {
    const team = await db.team.findUnique({
        where: {id: params.teamId},
        include: {
            players: true
        }
    });
    if (!team) {
        throw new Error("Team not found");
    }
    console.log(JSON.stringify(team, null, 2))
    return json({team});
};
export default function TeamPlayersIndexRoute() {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <div>
                <h1>
                    Players
                </h1>
                <div>
                    <ul>
                        {data.team?.players?.map((player) => (
                            <li key={player.id}>
                                <Link to={player.id}>{player.firstName} {player.lastName}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}