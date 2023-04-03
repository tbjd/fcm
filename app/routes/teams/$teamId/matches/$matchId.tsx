import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {db} from "~/utils/db.server";

export const loader = async ({params}: LoaderArgs) => {
    const match = await db.match.findUnique({
        where: {id: params.matchId},
        include: {
            homeTeam: true,
            visitingTeam: true,
            alignment: {
                include: {
                    startingPlayers: {
                        include: {
                            player: true
                        }
                    }
                }
            },
        }
    });
    if (!match) {
        throw new Error("Match not found");
    }
    console.log(JSON.stringify(match,null,2))
    return json({match});
};

export default function MatchRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <div>
                Formation: {data.match?.alignment?.formation}
            </div>
            <div>
                <ul>
                    {data.match?.alignment?.startingPlayers.map((player)=>(
                        <li key={player.player.id}>
                            <span><img src={player.player.picture || ""} height="100px"/></span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
