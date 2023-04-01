import {Link} from "@remix-run/react";

export default function TeamsIndexRoute() {
    return (
        <div>
            <div>
                <h1>
                    Teams
                </h1>
                <div>
                    <ul>
                        <li>
                            <Link to="a-team-id">Mad scientist</Link>
                        </li>
                    </ul>
                </div>
                <Link to="new">
                    Add a team
                </Link>
            </div>
        </div>
    );
}
