import express from 'express'
import cors from 'cors'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname( fileURLToPath(import.meta.url) )

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/receptai', (req, res) => {
    res.sendFile(__dirname + '/templates/receptai.html')
})

app.get('/receptas/:id', (req, res) => {
    const id = req.params.id
    const receptai = {
        1: {
            ingridientai: ` Pirmas receptas
                            Vištienos krūtinėlė, 500 gramų <br />
                            Kiaušiniai, 2 vienetai <br />
                            Vanduo, šalto, 1 valgomasis šaukštas<br />
                            Druska, 0.5 arbatinio šaukštelio<br />
                            Juodieji pipirai, 0.5 arbatinio šaukštelio<br />
                            Aliejus<br />
                            Pabarstymui:<br />
                            Malti džiūvėsėliai, 1 stiklinė<br />
                            Miltai, 0.5 stiklinės<br />
                            Druska, 1 arbatinis šaukštelis<br />
                            Saldžiosios paprikos milteliai, 1 arbatinis šaukštelis<br />
                            Česnako milteliai, 1 arbatinis šaukštelis<br />
                            Svogūnų milteliai, 1 arbatinis šaukštelis
                        `,
            paruosimas: `
                        Vištienos krūtinėlę padedame ant maistinės plėvelės, ant viršaus taip pat užtiesiame maistinę plėvelę ir vištieną gerai išmušame mėsos muštuku. Krūtinėlė turėtų būti ~1-1,5 cm storio. Tada krūtinėlę supjaustome į nedidelius kvadratėlius<br />
                        Viename inde išplakame kiaušinius su vandeniu, druska ir pipirais.<br />
                        Kitame inde sumaišome džiūvėsėlius, miltus ir prieskonius, skirtus pabarstymui.<br />
                        Keptuvėje įkaitiname šiek tiek aliejaus ant vidutinės ugnies.<br />
                        Imame po vieną vištienos gabalėlį, pirmiausia įmerkiame į kiaušinių plakinį, tada dedame į džiūvėsėlius ir kepame įkaitintoje keptuvėje iš abiejų pusių, kol gabalėliai įgauna auksinę spalvą. Vištienos nereikia perkepti, kitaip gabalėliai bus kieti. Iškeptus vištienos gabalėlius dedame ant popierinio rankšluosčio, kad susigertų aliejus. Patiekiame su mėgstamu padažu.<br />
                        Atšalusius vištienos kąsnelius galite pašildyti įkaitintoje orkaitėje.<br />
                    `,
            nuotrauka: 'https://www.receptai.lt/uploads/modules/recipes/without-watermark/11194.jpg'
        },
        2: {
            ingridientai: `Antras receptas
                            Vištienos krūtinėlė, 500 gramų <br />
                            Kiaušiniai, 2 vienetai <br />
                            Vanduo, šalto, 1 valgomasis šaukštas<br />
                            Druska, 0.5 arbatinio šaukštelio<br />
                            Juodieji pipirai, 0.5 arbatinio šaukštelio<br />
                            Aliejus<br />
                            Pabarstymui:<br />
                            Malti džiūvėsėliai, 1 stiklinė<br />
                            Miltai, 0.5 stiklinės<br />
                            Druska, 1 arbatinis šaukštelis<br />
                            Saldžiosios paprikos milteliai, 1 arbatinis šaukštelis<br />
                            Česnako milteliai, 1 arbatinis šaukštelis<br />
                            Svogūnų milteliai, 1 arbatinis šaukštelis
                        `,
            paruosimas: `
                        Vištienos krūtinėlę padedame ant maistinės plėvelės, ant viršaus taip pat užtiesiame maistinę plėvelę ir vištieną gerai išmušame mėsos muštuku. Krūtinėlė turėtų būti ~1-1,5 cm storio. Tada krūtinėlę supjaustome į nedidelius kvadratėlius<br />
                        Viename inde išplakame kiaušinius su vandeniu, druska ir pipirais.<br />
                        Kitame inde sumaišome džiūvėsėlius, miltus ir prieskonius, skirtus pabarstymui.<br />
                        Keptuvėje įkaitiname šiek tiek aliejaus ant vidutinės ugnies.<br />
                        Imame po vieną vištienos gabalėlį, pirmiausia įmerkiame į kiaušinių plakinį, tada dedame į džiūvėsėlius ir kepame įkaitintoje keptuvėje iš abiejų pusių, kol gabalėliai įgauna auksinę spalvą. Vištienos nereikia perkepti, kitaip gabalėliai bus kieti. Iškeptus vištienos gabalėlius dedame ant popierinio rankšluosčio, kad susigertų aliejus. Patiekiame su mėgstamu padažu.<br />
                        Atšalusius vištienos kąsnelius galite pašildyti įkaitintoje orkaitėje.<br />
                    `,
            nuotrauka: 'https://www.receptai.lt/uploads/modules/recipes/without-watermark/11194.jpg'
        },
        3: {
            ingridientai: `Trečias receptas
                            Vištienos krūtinėlė, 500 gramų <br />
                            Kiaušiniai, 2 vienetai <br />
                            Vanduo, šalto, 1 valgomasis šaukštas<br />
                            Druska, 0.5 arbatinio šaukštelio<br />
                            Juodieji pipirai, 0.5 arbatinio šaukštelio<br />
                            Aliejus<br />
                            Pabarstymui:<br />
                            Malti džiūvėsėliai, 1 stiklinė<br />
                            Miltai, 0.5 stiklinės<br />
                            Druska, 1 arbatinis šaukštelis<br />
                            Saldžiosios paprikos milteliai, 1 arbatinis šaukštelis<br />
                            Česnako milteliai, 1 arbatinis šaukštelis<br />
                            Svogūnų milteliai, 1 arbatinis šaukštelis
                        `,
            paruosimas: `
                        Vištienos krūtinėlę padedame ant maistinės plėvelės, ant viršaus taip pat užtiesiame maistinę plėvelę ir vištieną gerai išmušame mėsos muštuku. Krūtinėlė turėtų būti ~1-1,5 cm storio. Tada krūtinėlę supjaustome į nedidelius kvadratėlius<br />
                        Viename inde išplakame kiaušinius su vandeniu, druska ir pipirais.<br />
                        Kitame inde sumaišome džiūvėsėlius, miltus ir prieskonius, skirtus pabarstymui.<br />
                        Keptuvėje įkaitiname šiek tiek aliejaus ant vidutinės ugnies.<br />
                        Imame po vieną vištienos gabalėlį, pirmiausia įmerkiame į kiaušinių plakinį, tada dedame į džiūvėsėlius ir kepame įkaitintoje keptuvėje iš abiejų pusių, kol gabalėliai įgauna auksinę spalvą. Vištienos nereikia perkepti, kitaip gabalėliai bus kieti. Iškeptus vištienos gabalėlius dedame ant popierinio rankšluosčio, kad susigertų aliejus. Patiekiame su mėgstamu padažu.<br />
                        Atšalusius vištienos kąsnelius galite pašildyti įkaitintoje orkaitėje.<br />
                    `,
            nuotrauka: 'https://www.receptai.lt/uploads/modules/recipes/without-watermark/11194.jpg'
        }
    }

    res.json(receptai[id])
})

app.get('/api/', (req, res) => {
    const objektas = {
        vardas: 'Vilius',
        pavarde: 'Ramulionis'
    }
    res.json(objektas)
})

app.get('/api/weather/', (req, res) => {

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const condition = ['windy', 'rain', 'sunshine']
    const location = ['London, UK', 'Madrid, Spain', 'Vilnius, Lithuania', 'Berlin, Germany']

    const objektas = {
        condition: condition[random(0, 2)],
        degrees: random(-8, 40),
        location: location[random(0, 3)],
        windSpeed: random(1, 10),
        humidity: random(40, 100)
    }
    res.json(objektas)
})


app.listen(3000)