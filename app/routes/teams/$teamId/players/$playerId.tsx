import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader = async ({params}: LoaderArgs) => {
    /*const joke = await db.joke.findUnique({
        where: { id: params.jokeId },
    });*/
    const player = {id: params.playerId, firstName:"Tristan", lastName:"Brodeur",position: "ST"}
    if (!player) {
        throw new Error("Player not found");
    }
    return json({player});
};

export default function TeamPlayerRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{data.player.firstName}  {data.player.lastName}</h1>
        </div>
    );
}
