import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();

async function seed() {
    const visitingTeam = await db.team.create({
        data: {
            name: "Mad scientist",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Mad_scientist.svg/1920px-Mad_scientist.svg.png",
            players: {
                create: [
                    {
                        firstName: "Tristan",
                        lastName: "Brodeur",
                        picture: "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/321239165_3366199346926442_3292646110344143136_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3IV8x48MccIAX9EAIEx&_nc_ht=scontent-lga3-1.xx&oh=00_AfCm1ZAPM94yPXIkGYjn-tGbKrZ4WEktY8oB-VMNyOx0Rg&oe=642CD713",
                        positions: {
                            create: [
                                {
                                    position: "ST"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Sofiane",
                        lastName: "Yacine",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "RM"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Hugo",
                        lastName: "Druais",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "RB"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Julien",
                        lastName: "Trocme",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "LM"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Gustavo",
                        lastName: "Pele",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "LB"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Christiano",
                        lastName: "Ronaldo",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "CM"
                                }
                            ]
                        }
                    },
                    {
                        firstName: "Jacques",
                        lastName: "Pel",
                        picture: "",
                        positions: {
                            create: [
                                {
                                    position: "GK"
                                }
                            ]
                        }
                    }
                ]
            }
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
    console.log(JSON.stringify(visitingTeam, null, 2))
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