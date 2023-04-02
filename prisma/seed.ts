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
                                    position: "ST"
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
                                    position: "CB"
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
                                    position: "FLW"
                                }
                            ]
                        }
                    }
                ]
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
                    formation: "3-1-2"
                }
            }

        }
    })
}

seed();
