import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {db} from "~/utils/db.server";

export const loader = async ({params}: LoaderArgs) => {
    const player = await db.player.findUnique({
        where: {id: params.playerId},
    });
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
