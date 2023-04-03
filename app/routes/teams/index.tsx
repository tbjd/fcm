import {Link, useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";
import {db} from "~/utils/db.server";

export const loader = async () => {
    const teams = await db.team.findMany();
    if (!teams) {
        throw new Error("Teams not found");
    }
    return json({teams});
};

export default function TeamsIndexRoute() {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <div>
                <h1>
                    Teams
                </h1>
                <div>
                    <ul>
                        {data.teams.map((team) => (
                            <li key={team.id}>
                                <Link to={team.id}>
                                    {team.name}
                                </Link>
                            </li>))}
                    </ul>
                </div>
                <Link to="new">
                    Add a team
                </Link>
            </div>
        </div>
    );
}
