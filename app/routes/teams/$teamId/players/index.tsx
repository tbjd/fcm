import {Link} from "@remix-run/react";

export default function TeamPlayersIndexRoute() {
    return (
        <div>
            <div>
                <h1>
                    Players
                </h1>
                <div>
                    <ul>
                        <li>
                            <Link to="a-player-id">Tristan Brodeur</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}