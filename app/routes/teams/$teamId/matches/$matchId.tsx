import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader = async ({params}: LoaderArgs) => {
    /*const joke = await db.joke.findUnique({
        where: { id: params.jokeId },
    });*/
    const match = {id: params.matchId, homeTeam: "Mad Scientist", visitorTeam: "FC BA"}
    if (!match) {
        throw new Error("Match not found");
    }
    return json({match});
};

export default function MatchRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{data.match.homeTeam} vs {data.match.visitorTeam}</h1>
        </div>
    );
}
