import {Link} from "@remix-run/react";

export default function TeamMatchesIndexRoute() {
    return (
        <div>
            <div>
                <h1>
                    Matches
                </h1>
                <div>
                    <ul>
                        <li>
                            <Link to="a-match-id">Mad scientist vs FC BA</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}