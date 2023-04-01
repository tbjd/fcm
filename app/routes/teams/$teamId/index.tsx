import {Link} from "@remix-run/react";

export default function TeamIndexRoute() {
    return (
        <ul>
            <li>
                <Link to="matches">Matches</Link>
            </li>
            <li>
                <Link to="players">Players</Link>
            </li>
        </ul>
    );
}