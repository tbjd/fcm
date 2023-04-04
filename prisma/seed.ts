import {PrismaClient} from "@prisma/client";
import {players} from "./mock/player";

const db = new PrismaClient();

async function seed() {
    const user = await db.user.create({
        data: {
            username: "tristanbrodeur@hotmail.com",
            roles: {
                create: [{name: "MANAGER"}]
            },
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            manager: {
                create: {
                    firstName: "Tristan",
                    lastName: "Brodeur"
                }
            }
        },
        include: {
            manager: true,
        }
    })
    const visitingTeam = await db.team.create({
        data: {
            name: "Mad scientist",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Mad_scientist.svg/1920px-Mad_scientist.svg.png",
            players: {
                create: players
            },
            managerId: user.manager?.id
        },
        include: {
            players: {
                include: {
                    positions: true
                }
            }
        }
    })
    const homeTeam = await db.team.create({
        data: {
            name: "FC badou",
            logo: "https://yt3.googleusercontent.com/ytc/AL5GRJXGpNAqerYbrxGNcUKRoZ1BCSYAgIRKm83QYGdz=s900-c-k-c0x00ffffff-no-rj",
        }
    })
    const match = await db.match.create({
        data: {
            date: new Date(),
            homeTeamId: homeTeam.id,
            visitingTeamId: visitingTeam.id,
            alignment: {
                create: {
                    formation: "2-3-1"
                }
            }
        },
        include: {
            alignment: true
        }
    })
    await Promise.all(
        getStartingPlayer(visitingTeam, match).map((startingPlayer) => {
            return db.matchPlayerPosition.create({data: startingPlayer});
        })
    );
}

seed();

function getStartingPlayer(visitingTeam: any, match: any) {
    return [
        {
            playerId: visitingTeam.players[0].id,
            matchPosition: visitingTeam.players[0].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[1].id,
            matchPosition: visitingTeam.players[1].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[2].id,
            matchPosition: visitingTeam.players[2].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[3].id,
            matchPosition: visitingTeam.players[3].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[4].id,
            matchPosition: visitingTeam.players[4].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[5].id,
            matchPosition: visitingTeam.players[5].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        },
        {
            playerId: visitingTeam.players[6].id,
            matchPosition: visitingTeam.players[6].positions[0].position,
            matchStartingAlignmentId: match.alignment?.id
        }
    ]
}