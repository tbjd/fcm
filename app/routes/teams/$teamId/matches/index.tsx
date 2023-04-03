import {Link, useLoaderData} from "@remix-run/react";
import {db} from "~/utils/db.server";
import {json} from "@remix-run/node";

export const loader = async () => {
    const matches = await db.match.findMany({
        include: {
            homeTeam: true,
            visitingTeam: true
        }
    });
    if (!matches) {
        throw new Error("Matches not found");
    }
    return json({matches});
};
export default function TeamMatchesIndexRoute() {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <div>
                <h1>
                    Matches
                </h1>
                <div>
                    <ul>
                        {data.matches.map((match) => (
                            <li key={match.id}>
                                <Link to={match.id}>
                                    {match.homeTeam.name} vs {match.visitingTeam.name}
                                </Link>
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>
    );
}