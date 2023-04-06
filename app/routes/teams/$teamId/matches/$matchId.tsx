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
                    },
                    formation: {
                        include: {
                            playerPositions: true
                        }
                    }
                }
            },
        }
    });
    if (!match) {
        throw new Error("Match not found");
    }
    const playerPositions = match.alignment?.formation.playerPositions
    let field: any[];
    field = [];
    for(let i=0; i<9; i++) {
        field[i] = new Array(9);
    }
    playerPositions?.forEach((p)=> field[p.coordinateY][p.coordinateX - 1] = p)
    field.reverse()
    return json({match,field});
};

export default function MatchRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <div>
                Formation: {data.match?.alignment?.formation?.name}
            </div>

                <div className="grid grid-cols-9 gap-4">
                    {data?.field.map((x)=>x.map((position:any)=>(
                        <div>{position?.position}</div>
                    )))}
                </div>
        </div>

    );
}
