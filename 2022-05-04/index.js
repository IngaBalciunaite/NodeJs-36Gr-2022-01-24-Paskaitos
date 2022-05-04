import {readFile, appendFile, writeFile} from 'fs/promises'

// Patalpinimas tekstiniame faile

// const hello = await readFile('hello.txt', 'utf8')

// console.log(hello)

// await appendFile('hello.txt', '\nPapildytas tekstas', 'utf8')

// Informacijos talpinimas json faile

//JSON.parse() - Stringo konvertavimas į masyvą arba objektą
//JSON.strigify() - Masyvo arba objekto konvertavimas į JSON stringą

let masyvas = []

const objektas = {
    vardas: "Vilius",
    pavarde: "Ramulionis",
    adresas: "Evergreen terras 123-12",
    telefonas: "+3706451665"
}

try {
    const database = await readFile('database.json', 'utf8')

    if(database === '') {
        masyvas.push(objektas)
    } else {
        masyvas = JSON.parse(database)
        masyvas.push(objektas)
    }

    let jsonString = JSON.stringify(masyvas)

    await writeFile('database.json', jsonString, 'utf8')

    console.log('Duomenys sekmingi issaugoti database.json faile')
} catch {
    console.log('Duomenu issaugokiti nepavyko')
}


//developmental
//production